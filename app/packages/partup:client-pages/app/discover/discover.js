/**
 * Discover created
 */
Template.app_discover.onCreated(function() {
    var tpl = this;

    tpl.partups = {

        // Constants
        STARTING_LIMIT: 12,
        INCREMENT: 8,

        // States
        loading: false,
        end_reached: false,

        // Namespace for columns layout functions (added by helpers)
        layout: {},

        // Hydrate partups
        hydrate: function(partups) {
            lodash.each(partups, function(partup) {

                // Hydrate the partup with the 'registerSubscription' function
                partup.registerSubscription = function(handle) {
                    tpl.partups.child_handles.push(handle);
                };

            });
        },

        // Partups subscription handle
        handle: null,

        // Options reactive variable (on change, clear the layout and re-add all partups)
        options: new ReactiveVar({}, function(a, b) {
            var options = b;
            options.limit = tpl.partups.resetLimit();

            tpl.partups.stopChildHandles();
            tpl.partups.handle = tpl.subscribe('partups.discover', options);
            tpl.partups.loading = true;

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.partups.handle.ready()) {
                    computation.stop(); // Stop the autorun
                    tpl.partups.loading = false;

                    /**
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Remove all partups from the column layout
                     * - Get all current partups from our local database
                     * - Remove all partups from our local database (by stopping the subscription)
                     * - Hydrate our partups (see: hydratePartups function)
                     * - Add our partups to the layout
                     */
                    Tracker.nonreactive(function replacePartups() {
                        tpl.partups.layout.clear();

                        var partups = Partups.find().fetch();
                        tpl.partups.handle.stop();

                        tpl.partups.hydrate(partups);
                        tpl.partups.layout.add(partups);
                    });
                }
            });
        }),

        // Limit reactive variable (on change, add partups to the layout)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(a, b) {
            var first = b === tpl.partups.STARTING_LIMIT;
            if (first) return;

            var options = tpl.partups.options.get();
            options.limit = tpl.partups.limit.get();

            // Save the current partups from the local database to be able to compare it hereafter
            var oldPartups = Partups.find().fetch();

            tpl.partups.stopChildHandles();
            tpl.partups.handle = tpl.subscribe('partups.discover', options);
            tpl.partups.loading = true;

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.partups.handle.ready()) {
                    computation.stop(); // Stop the autorun
                    tpl.partups.loading = false;

                    /**
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Get all current partups from our local database
                     * - Remove all partups from our local database (by stopping the subscription)
                     * - Compare the newPartups with the oldPartups to find the addedPartups
                     * - Hydrate our partups (see: hydratePartups function)
                     * - Add our partups to the layout
                     * - Call the infiniteScrollCallback (which is needed for the infinite scroll debounce)
                     */
                    Tracker.nonreactive(function addPartups() {

                        var newPartups = Partups.find().fetch();
                        tpl.partups.handle.stop();

                        var difference = newPartups.length - oldPartups.length;
                        tpl.partups.end_reached = difference < tpl.partups.INCREMENT;

                        var addedPartups = mout.array.filter(newPartups, function(partup) {
                            return !mout.array.find(oldPartups, function(_partup) {
                                return partup._id === _partup._id;
                            });
                        });

                        tpl.partups.hydrate(addedPartups);
                        tpl.partups.layout.add(addedPartups);
                    });
                }
            });
        }),

        // Increase limit function
        increaseLimit: function() {
            tpl.partups.limit.set(tpl.partups.limit.get() + tpl.partups.INCREMENT);
        },

        // Reset limit function
        resetLimit: function() {
            tpl.partups.limit.set(tpl.partups.STARTING_LIMIT);
            tpl.partups.end_reached = false;
        },

        // Partup tiles subscription handles
        child_handles: [],
        stopChildHandles: function() {
            lodash.each(tpl.partups.child_handles, function(handle) {
                handle.stop();
            });
            tpl.partups.child_handles = [];
        }
    };
});

/**
 * Discover rendered
 */
Template.app_discover.onRendered(function() {
    var tpl = this;

    /**
     * Infinite scroll
     */
    Partup.client.scroll.infinite({
        template: tpl,
        element: tpl.find('[data-infinitescroll-container]')
    }, function() {
        if (tpl.partups.loading || tpl.partups.end_reached) return;
        tpl.partups.increaseLimit();
    });

    /**
     * Filter options
     */
    var keywords = document.querySelector('[data-discover-search] [name=keywords]');
    var network = document.querySelector('[data-discover-search] [name=network]');
    var city = document.querySelector('[data-discover-search] [name=city]');
    var sort = document.querySelector('[data-discover-search] [name=sort]');

    var networkToOption = function(n) {
        return {value: n._id, label: n.name};
    };

    var networks = mout.array.map(Networks.find().fetch(), networkToOption);

    new Partup.client.CustomSelect(network, {
        showFilter: true,
        suggestionsLabel: 'Suggesties',
        suggestions: networks,
        onFilter: function(value, done) {
            var regexp = new RegExp(value, 'i');
            var networks = mout.array.map(Networks.find({name: regexp}).fetch(), networkToOption);
            networks.unshift({value: '', label: 'Netwerk'});
            this.update(networks);
            done();
        }
    });

    new Partup.client.CustomSelect(city, {
        showFilter: true
    });

    new Partup.client.CustomSelect(sort);
});

/**
 * Discover destroyed
 */
Template.app_discover.onDestroyed(function() {
    this.partups.stopChildHandles();
});

/**
 * Discover helpers
 */
Template.app_discover.helpers({
    showProfileCompletion: function() {
        var user = Meteor.user();
        if (!user) return false;
        if (!user.completeness) return false;
        return user.completeness < 100;
    },
    profileCompletion: function() {
        var user = Meteor.user();
        if (!user) return false;
        if (!user.completeness) return '...';
        return user.completeness;
    },

    totalNumberOfPartups: function() {
        var count = Counts.get('partups');
        if (count) {
            return count;
        } else {
            return '...';
        }
    },

    // We use this trick to be able to call a function in a child template.
    // The child template directly calls 'addToLayoutHook' with a callback.
    // We save that callback, so we can call it later and the child template can react to it.
    addToLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.partups.layout.add = callback;
        };
    },
    clearLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.partups.layout.clear = callback;
        };
    }
});

/**
 * Discover events
 */
Template.app_discover.events({
    'click [data-search]': function(event, template) {
        event.preventDefault();
        var form = event.currentTarget.form;
        var search_query = lodash.find(form, {name: 'keywords'}).value;

        template.partups.options.set({
            limit: template.partups.STARTING_LIMIT,
            query: search_query
        });
    },
    'submit [data-discover-search]': function(event, template) {
        event.preventDefault();
    }
});
