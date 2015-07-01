Template.app_network_partups.onCreated(function() {
    var tpl = this;
    var networkId = tpl.data.networkId;
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

            var oldHandle = tpl.partups.handle;
            tpl.partups.handle = tpl.subscribe('networks.one.partups', networkId, options);

            var oldCountHandle = tpl.partups.count_handle;
            tpl.partups.count_handle = tpl.subscribe('networks.one.partups.count', networkId, options);

            Meteor.autorun(function whenCountSubscriptionIsReady(computation) {
                if (tpl.partups.count_handle.ready()) {
                    computation.stop();
                    if (oldCountHandle) oldCountHandle.stop();

                    var new_count = Counts.get('networks.one.partups.filterquery');
                    tpl.partups.layout.count.set(new_count);
                }
            });

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.partups.handle.ready()) {
                    computation.stop();
                    if (oldHandle) oldHandle.stop();

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

            var oldHandle = tpl.partups.handle;
            tpl.partups.handle = tpl.subscribe('networks.one.partups', networkId, options);
            tpl.partups.loading.set(true);

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.partups.handle.ready()) {
                    computation.stop();
                    if (oldHandle) oldHandle.stop();

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

    // First run
    tpl.partups.options.set({});
});

Template.app_network_partups.onRendered(function() {
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

Template.app_network_partups.helpers({
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
})
