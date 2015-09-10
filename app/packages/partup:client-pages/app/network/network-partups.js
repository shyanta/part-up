var partupsToColumnTiles = function(partups) {
    return lodash.map(partups, function(partup) {
        return {
            partup: partup
        };
    });
};

/**
 * Render network partups
 *
 * @module Template.app_network_partups
 * @param {String} network
 */
Template.app_network_partups.onCreated(function() {
    var tpl = this;

    tpl.partups = {

        // Constants
        STARTING_LIMIT: 12,
        INCREMENT: 8,

        // States
        loading: new ReactiveVar(false),
        count_loading: new ReactiveVar(false),
        infinitescroll_loading: new ReactiveVar(false),
        end_reached: new ReactiveVar(false),

        // Namespace for columns layout functions (added by helpers)
        layout: {
            items: [],
            count: new ReactiveVar(0)
        },

        // Partups subscription handle
        handle: null,
        count_handle: null,

        // PartupTile data
        partupTileData: function(partup) {
            var data = lodash.cloneDeep(partup);
            data.HIDE_NETWORKTILE = true;
            return data;
        },

        // Options reactive variable (on change, clear the layout and re-add all partups)
        options: new ReactiveVar({}, function(a, b) {
            tpl.partups.resetLimit();

            var options = b;
            options.limit = tpl.partups.STARTING_LIMIT;

            // Set networks.one.partups.count subscription
            if (tpl.partups.count_handle) tpl.partups.count_handle.stop();
            tpl.partups.count_handle = tpl.subscribe('networks.one.partups.count', tpl.data.networkSlug, options, {
                onReady: function() {
                    tpl.partups.count_loading.set(false);

                    var new_count = Counts.get('networks.one.partups.filterquery');
                    tpl.partups.layout.count.set(new_count);
                }
            });
            tpl.partups.count_loading.set(true);

            // Set networks.one.partups subscription
            if (tpl.partups.handle) tpl.partups.handle.stop();
            tpl.partups.handle = tpl.subscribe('networks.one.partups', tpl.data.networkSlug, options, {
                onReady: function() {
                    var network = Networks.findOne({slug: tpl.data.networkSlug});
                    tpl.partups.loading.set(false);

                    var partups = Partups.findForNetwork(network).fetch();

                    var partupTileDatas = lodash.map(partups, function(partup) {
                        return tpl.partups.partupTileData(partup);
                    });

                    tpl.partups.layout.items = tpl.partups.layout.clear();
                    tpl.partups.layout.items = tpl.partups.layout.add(partupsToColumnTiles(partupTileDatas));
                }
            });
            tpl.partups.loading.set(true);
        }),

        // Limit reactive variable (on change, add partups to the layout)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(a, b) {
            var first = b === tpl.partups.STARTING_LIMIT;
            if (first) return;

            var options = tpl.partups.options.get();
            options.limit = b;

            if (tpl.partups.handle) tpl.partups.handle.stop();
            tpl.partups.handle = tpl.subscribe('networks.one.partups', tpl.data.networkSlug, options, {
                onReady: function() {
                    var network = Networks.findOne({slug: tpl.data.networkSlug});
                    tpl.partups.infinitescroll_loading.set(false);

                    var oldPartups = tpl.partups.layout.items;
                    var newPartups = Partups.findForNetwork(network).fetch();

                    var diffPartups = mout.array.filter(newPartups, function(partup) {
                        return !mout.array.find(oldPartups, function(item) {
                            return partup._id === item.partup._id;
                        });
                    });

                    var end_reached = diffPartups.length === 0;
                    tpl.partups.end_reached.set(end_reached);

                    var partupTileDatas = lodash.map(diffPartups, function(partup) {
                        return tpl.partups.partupTileData(partup);
                    });

                    tpl.partups.layout.items = tpl.partups.layout.add(partupsToColumnTiles(partupTileDatas));
                }
            });
            tpl.partups.infinitescroll_loading.set(true);
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
    count: function() {
        return Template.instance().partups.layout.count.get() || '';
    },
    partupsLoading: function() {
        var tpl = Template.instance();
        return tpl.partups.loading.get() || tpl.partups.count_loading.get();
    },
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
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

Template.app_network_partups.events({
    'click [data-create-partup-in-tribe]': function(event, template) {
        event.preventDefault();

        var networkSlug = template.data.networkSlug;
        var network = Networks.findOne({slug: networkSlug});

        Session.set('createPartupForNetworkById', network._id);

        Intent.go({route: 'create-details'}, function(slug) {
            if (slug) {
                Router.go('partup', {
                    slug: slug
                });
            } else {
                this.back();
            }
            Session.set('createPartupForNetworkById', false);
        });
    }
});
