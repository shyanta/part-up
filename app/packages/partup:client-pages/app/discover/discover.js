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
        loading: new ReactiveVar(true),
        end_reached: new ReactiveVar(true),

        // Namespace for columns layout functions (added by helpers)
        layout: {
            items: [],
            count: new ReactiveVar(0)
        },

        // Partups subscription handle
        handle: null,
        count_handle: null,

        // Options reactive variable (on change, clear the layout and re-add all partups)
        options: new ReactiveVar({}, function(a, b) {
            tpl.partups.resetLimit();

            var options = b;
            options.limit = tpl.partups.STARTING_LIMIT;

            tpl.partups.loading.set(true);

            if (tpl.partups.handle) tpl.partups.handle.stop();
            tpl.partups.handle = tpl.subscribe('partups.discover', options);

            if (tpl.partups.count_handle) tpl.partups.count_handle.stop();
            tpl.partups.count_handle = tpl.subscribe('partups.discover.count', options);

            Meteor.autorun(function whenCountSubscriptionIsReady(computation) {
                if (tpl.partups.count_handle.ready()) {
                    computation.stop();

                    var new_count = Counts.get('partups.discover.filterquery');
                    tpl.partups.layout.count.set(new_count);
                }
            });

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
        }),

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

    // Submit filter form
    tpl.submitFilterForm = function() {
        Meteor.defer(function() {
            var form = tpl.find('form#discoverQuery');
            $(form).submit();
        });
    };

    // Selector dropdown toggles
    tpl.networkSelectorToggle = new ReactiveVar(false, function(a, b) {
        if (!b) return;

        // Focus the searchfield
        Meteor.defer(function() {
            var searchfield = tpl.find('form#networkSelector').elements.search;
            if (searchfield) searchfield.focus();
        });
    });
    tpl.locationSelectorToggle = new ReactiveVar(false, function(a, b) {
        if (!b) return;

        // Focus the searchfield
        Meteor.defer(function() {
            var searchfield = tpl.find('form#locationSelector').elements.search;
            if (searchfield) searchfield.focus();
        });
    });
    tpl.sortingSelectorToggle = new ReactiveVar(false);

    // Sorting options
    tpl.sorting_options = [
        {
            value: 'popular',
            label: 'Popular'
        },
        {
            value: 'new',
            label: 'Newest'
        }
    ];

    // Selected network
    tpl.selectedFilterNetwork = new ReactiveVar();
    tpl.selectedFilterLocation = new ReactiveVar();
    tpl.selectedFilterSorting = new ReactiveVar(lodash.find(tpl.sorting_options, {value: 'popular'}));

    // Submit filter form once
    tpl.submitFilterForm();
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
        if (tpl.partups.loading.get() || tpl.partups.end_reached.get()) return;
        tpl.partups.increaseLimit();
    });
});

/**
 * Discover helpers
 */
Template.app_discover.helpers({
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
    },
    shrinkPageHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    },

    // Network
    networkSelectorToggle: function() {
        return Template.instance().networkSelectorToggle;
    },
    networkSelectorData: function() {
        var tpl = Template.instance();
        var DROPDOWN_ANIMATION_DURATION = 200;

        return {
            onSelect: function(networkId) {
                tpl.networkSelectorToggle.set(false);

                Meteor.setTimeout(function() {
                    tpl.selectedFilterNetwork.set(networkId);
                    tpl.submitFilterForm();
                }, DROPDOWN_ANIMATION_DURATION);
            }
        };
    },
    selectedNetwork: function() {
        return Template.instance().selectedFilterNetwork.get();
    },

    // Location
    locationSelectorToggle: function() {
        return Template.instance().locationSelectorToggle;
    },
    locationSelectorData: function() {
        var tpl = Template.instance();
        var DROPDOWN_ANIMATION_DURATION = 200;

        return {
            onSelect: function(location) {
                tpl.locationSelectorToggle.set(false);

                Meteor.setTimeout(function() {
                    tpl.selectedFilterLocation.set(location);
                    tpl.submitFilterForm();
                }, DROPDOWN_ANIMATION_DURATION);
            }
        };
    },
    selectedLocation: function() {
        return Template.instance().selectedFilterLocation.get();
    },

    // Sorting
    sortingSelectorToggle: function() {
        return Template.instance().sortingSelectorToggle;
    },
    sortingSelectorData: function() {
        var tpl = Template.instance();
        var DROPDOWN_ANIMATION_DURATION = 200;

        return {
            onSelect: function(sorting) {
                tpl.sortingSelectorToggle.set(false);

                Meteor.setTimeout(function() {
                    tpl.selectedFilterSorting.set(sorting);
                    tpl.submitFilterForm();
                }, DROPDOWN_ANIMATION_DURATION);
            },
            options: tpl.sorting_options,
            default: tpl.selectedFilterSorting.get().value
        };
    },
    selectedSorting: function() {
        return Template.instance().selectedFilterSorting.get();
    }
});

/**
 * Discover events
 */
Template.app_discover.events({
    'submit form#discoverQuery': function(event, template) {
        event.preventDefault();

        var form = event.currentTarget;

        template.partups.options.set({
            limit: template.partups.STARTING_LIMIT,
            query: form.elements.search_query.value || undefined,
            networkId: form.elements.network_id.value || undefined,
            locationId: form.elements.location_id.value || undefined,
            sort: form.elements.sorting.value || undefined
        });

        window.scrollTo(0, 0);
    },

    // Network selector
    'click [data-open-networkselector]': function(event, template) {
        var current = template.networkSelectorToggle.get();
        template.networkSelectorToggle.set(!current);
    },
    'click [data-reset-selected-network]': function(event, template) {
        event.stopPropagation();
        template.selectedFilterNetwork.set('');
        template.submitFilterForm();
    },

    // Location selector
    'click [data-open-locationselector]': function(event, template) {
        var current = template.locationSelectorToggle.get();
        template.locationSelectorToggle.set(!current);
    },
    'click [data-reset-selected-location]': function(event, template) {
        event.stopPropagation();
        template.selectedFilterLocation.set('');
        template.submitFilterForm();
    },

    // Sorting selector
    'click [data-open-sortingselector]': function(event, template) {
        var current = template.sortingSelectorToggle.get();
        template.sortingSelectorToggle.set(!current);
    }
});
