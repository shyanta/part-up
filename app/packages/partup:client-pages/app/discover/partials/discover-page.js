/**
 * Content for the Discover-page
 * This template shows the partup-tiles and handles the infinite scroll
 *
 * @param partupsOptions {ReactiveVar} - The reactive-var for the query options
 */

/**
 * Discover-page created
 */
Template.app_discover_page.onCreated(function() {
    var tpl = this;

    // The partups datamodel namespace
    tpl.partups = {

        // Constants
        STARTING_LIMIT: 12,
        INCREMENT: 8,

        // States
        loading: new ReactiveVar(true),
        end_reached: new ReactiveVar(true),

        // Namespace for columns layout functions (added by helpers)
        layout: {
            items: [],
            count: new ReactiveVar(0)
        },

        // Partups subscription handle
        handle: undefined,
        count_handle: undefined,

        // Options reactive variable (on change, clear the layout and re-add all partups)
        options: tpl.data.partupsOptions, // Reference to the passed partupsOptions reactive-var
        onOptionsChange: function(options) {
            options = options || {};

            // Reset the limit reactive-var and the limit property of options
            tpl.partups.resetLimit();
            options.limit = tpl.partups.STARTING_LIMIT;

            tpl.partups.loading.set(true);

            // Set partups.discover.count subscription
            if (tpl.partups.count_handle) tpl.partups.count_handle.stop();
            tpl.partups.count_handle = tpl.subscribe('partups.discover.count', options);

            // When the partups.discover.count data changes
            Meteor.autorun(function whenCountSubscriptionIsReady(computation) {
                if (tpl.partups.count_handle.ready()) {
                    computation.stop();

                    var new_count = Counts.get('partups.discover.filterquery');
                    tpl.partups.layout.count.set(new_count);
                }
            });

            // Set partups.discover subscription
            if (tpl.partups.handle) tpl.partups.handle.stop();
            tpl.partups.handle = tpl.subscribe('partups.discover', options);

            // When the partups.discover data changes
            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.partups.handle.ready()) {
                    computation.stop();

                    /**
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Reset the loading state
                     * - Get all current partups from our local database
                     * - Remove all partups from the column layout
                     * - Add our partups to the layout
                     */
                    Tracker.nonreactive(function replacePartups() {
                        tpl.partups.loading.set(false);
                        var partups = Partups.find().fetch();

                        tpl.partups.layout.items = tpl.partups.layout.clear();
                        tpl.partups.layout.items = tpl.partups.layout.add(partups);
                    });
                }
            });
        },

        // Limit reactive variable (on change, add partups to the layout)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(a, b) {
            var first = b === tpl.partups.STARTING_LIMIT;
            if (first) return;

            var options = tpl.partups.options.get();
            options.limit = b;

            if (tpl.partups.handle) tpl.partups.handle.stop();
            tpl.partups.handle = tpl.subscribe('partups.discover', options);
            tpl.partups.loading.set(true);

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.partups.handle.ready()) {
                    computation.stop();

                    /**
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Reset the loading state
                     * - Get all currently rendered partups
                     * - Get all current partups from our local database
                     * - Compare the newPartups with the oldPartups to find the difference
                     * - If no diffPartups were found, set the end_reached to true
                     * - Add our partups to the layout
                     */
                    Tracker.nonreactive(function addPartups() {
                        tpl.partups.loading.set(false);
                        var oldPartups = tpl.partups.layout.items;
                        var newPartups = Partups.find().fetch();

                        var diffPartups = mout.array.filter(newPartups, function(partup) {
                            return !mout.array.find(oldPartups, function(_partup) {
                                return partup._id === _partup._id;
                            });
                        });

                        var end_reached = diffPartups.length === 0;
                        tpl.partups.end_reached.set(end_reached);

                        tpl.partups.layout.items = tpl.partups.layout.add(diffPartups);
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
            tpl.partups.end_reached.set(false);
        }
    };

    // Fire onOptionsChange when the options change
    tpl.autorun(function() {
        tpl.partups.onOptionsChange(tpl.partups.options.get());
    });
});

/**
 * Discover-page rendered
 */
Template.app_discover_page.onRendered(function() {
    var tpl = this;

    /**
     * Infinite scroll
     */
    Partup.client.scroll.infinite({
        template: tpl,
        element: tpl.find('[data-infinitescroll-container]')
    }, function() {
        if (tpl.partups.loading.get() || tpl.partups.end_reached.get()) return;
        tpl.partups.increaseLimit();
    });
});

/**
 * Discover-page helpers
 */
Template.app_discover_page.helpers({
    count: function() {
        return Template.instance().partups.layout.count.get() || '';
    },
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
    partupLoading: function() {
        return Template.instance().partups.loading.get();
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
