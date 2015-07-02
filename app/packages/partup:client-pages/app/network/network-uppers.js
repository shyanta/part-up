Template.app_network_uppers.onCreated(function() {
    var tpl = this;
    var networkId = tpl.data.networkId;
    tpl.uppers = {

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

        // Uppers subscription handle
        handle: null,
        count_handle: null,

        // Options reactive variable (on change, clear the layout and re-add all uppers)
        options: new ReactiveVar({}, function(a, b) {
            tpl.uppers.resetLimit();

            var options = b;
            options.limit = tpl.uppers.STARTING_LIMIT;

            tpl.uppers.loading.set(true);

            if (tpl.uppers.handle) tpl.uppers.handle.stop();
            tpl.uppers.handle = tpl.subscribe('networks.one.uppers', networkId, options);

            if (tpl.uppers.count_handle) tpl.uppers.count_handle.stop();
            tpl.uppers.count_handle = tpl.subscribe('networks.one.uppers.count', networkId, options);

            Meteor.autorun(function whenCountSubscriptionIsReady(computation) {
                if (tpl.uppers.count_handle.ready()) {
                    computation.stop();

                    var new_count = Counts.get('networks.one.uppers.filterquery');
                    tpl.uppers.layout.count.set(new_count);
                }
            });

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.uppers.handle.ready()) {
                    computation.stop();

                    /**
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Reset the loading state
                     * - Get all current uppers from our local database
                     * - Remove all uppers from the column layout
                     * - Add our uppers to the layout
                     */
                    Tracker.nonreactive(function replaceUppers() {
                        tpl.uppers.loading.set(false);

                        var uppers = Meteor.users.find({networks: {$in: [networkId]}}).fetch();

                        tpl.uppers.layout.items = tpl.uppers.layout.clear();
                        tpl.uppers.layout.items = tpl.uppers.layout.add(uppers);
                    });
                }
            });
        }),

        // Limit reactive variable (on change, add uppers to the layout)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(a, b) {
            var first = b === tpl.uppers.STARTING_LIMIT;
            if (first) return;

            var options = tpl.uppers.options.get();
            options.limit = b;

            var oldHandle = tpl.uppers.handle;
            tpl.uppers.handle = tpl.subscribe('networks.one.uppers', networkId, options);
            tpl.uppers.loading.set(true);

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.uppers.handle.ready()) {
                    computation.stop();
                    if (oldHandle) oldHandle.stop();

                    /**
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Reset the loading state
                     * - Get all currently rendered uppers
                     * - Get all current uppers from our local database
                     * - Compare the newUppers with the oldUppers to find the difference
                     * - If no diffUppers were found, set the end_reached to true
                     * - Add our uppers to the layout
                     */
                    Tracker.nonreactive(function addUppers() {
                        tpl.uppers.loading.set(false);
                        var oldUppers = tpl.uppers.layout.items;
                        var newUppers = Meteor.users.find({networks: {$in: [networkId]}}).fetch();

                        var diffUppers = mout.array.filter(newUppers, function(partup) {
                            return !mout.array.find(oldUppers, function(_partup) {
                                return partup._id === _partup._id;
                            });
                        });

                        var end_reached = diffUppers.length === 0;
                        tpl.uppers.end_reached.set(end_reached);

                        tpl.uppers.layout.items = tpl.uppers.layout.add(diffUppers);
                    });
                }
            });
        }),

        // Increase limit function
        increaseLimit: function() {
            tpl.uppers.limit.set(tpl.uppers.limit.get() + tpl.uppers.INCREMENT);
        },

        // Reset limit function
        resetLimit: function() {
            tpl.uppers.limit.set(tpl.uppers.STARTING_LIMIT);
            tpl.uppers.end_reached.set(false);
        }
    };

    // First run
    tpl.uppers.options.set({});
});

Template.app_network_uppers.onRendered(function() {
    var tpl = this;

    /**
     * Infinite scroll
     */
    Partup.client.scroll.infinite({
        template: tpl,
        element: tpl.find('[data-infinitescroll-container]')
    }, function() {
        if (tpl.uppers.loading.get() || tpl.uppers.end_reached.get()) return;
        tpl.uppers.increaseLimit();
    });
});

Template.app_network_uppers.helpers({
    count: function() {
        return Template.instance().uppers.layout.count.get() || '';
    },
    uppersLoading: function() {
        return Template.instance().uppers.loading.get();
    },
    // We use this trick to be able to call a function in a child template.
    // The child template directly calls 'addToLayoutHook' with a callback.
    // We save that callback, so we can call it later and the child template can react to it.
    addToLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.uppers.layout.add = callback;
        };
    },
    clearLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.uppers.layout.clear = callback;
        };
    }
});
