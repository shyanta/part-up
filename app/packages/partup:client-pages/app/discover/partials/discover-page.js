/**
 * Content for the Discover-page
 * This template shows the partup-tiles and handles the infinite scroll
 *
 * @param partupsOptions {ReactiveVar} - The reactive-var for the query options
 */

var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

/**
 * Discover-page created
 */
Template.app_discover_page.onCreated(function() {
    var tpl = this;

    // The partups datamodel namespace
    tpl.partups = {

        // Constants
        STARTING_LIMIT: 24,
        INCREMENT: 24,

        // States
        loading: new ReactiveVar(true),
        infinitescroll_loading: new ReactiveVar(false),
        end_reached: new ReactiveVar(false),

        // Namespace for columns layout functions (added by helpers)
        layout: {
            items: [],
            count: new ReactiveVar(0)
        },

        // Partups subscription handle
        handle: undefined,

        // Partup ids placeholder
        ids: [],
        getLimitedIds: function(limit) {
            return this.ids.slice(0, limit);
        },

        // Options reactive variable (on change, clear the layout and re-add all partups)
        options: tpl.data.partupsOptions, // Reference to the passed partupsOptions reactive-var
        onOptionsChange: function(options) {
            if (!options) return;

            // Reset the limit reactive-var and the limit property of options
            tpl.partups.resetLimit();
            options.limit = null;

            // Call the partup ids
            tpl.partups.loading.set(true);
            Meteor.call('partups.discover', options, function(error, partupIds) {
                if (error || !partupIds) return;

                tpl.partups.layout.count.set(partupIds.length);

                tpl.partups.ids = partupIds;

                var limitedIds = tpl.partups.getLimitedIds(tpl.partups.STARTING_LIMIT);

                var sub = Subs.subscribe('partups.by_ids', limitedIds, function() {
                    var partups = Partups.find({_id: {$in: tpl.partups.ids}}).fetch();

                    tpl.partups.layout.items = tpl.partups.layout.clear();
                    tpl.partups.layout.items = tpl.partups.layout.add(partups);
                });

                tpl.autorun(function(c) {
                    if (sub.ready()) {
                        c.stop();
                        tpl.partups.loading.set(false);
                    }
                });
            });
        },

        // Limit reactive variable (on change, add partups to the layout)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(a, b) {
            var first = b === tpl.partups.STARTING_LIMIT;
            if (first) return;

            var limitedIds = tpl.partups.getLimitedIds(b);
            tpl.partups.infinitescroll_loading.set(true);

            var sub = Subs.subscribe('partups.by_ids', limitedIds, function() {
                var oldPartups = tpl.partups.layout.items;
                var newPartups = Partups.find({_id: {$in: tpl.partups.ids}}).fetch();

                var diffPartups = mout.array.filter(newPartups, function(partup) {
                    return !mout.array.find(oldPartups, function(_partup) {
                        return partup._id === _partup._id;
                    });
                });

                var end_reached = diffPartups.length === 0;
                tpl.partups.end_reached.set(end_reached);

                tpl.partups.layout.items = tpl.partups.layout.add(diffPartups);
            });

            tpl.autorun(function(c) {
                if (sub.ready()) {
                    c.stop();
                    tpl.partups.loading.set(false);
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
        if (tpl.partups.loading.get() || tpl.partups.infinitescroll_loading.get() || tpl.partups.end_reached.get()) return;
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
    partupsLoading: function() {
        var tpl = Template.instance();
        return tpl.partups.loading.get();
    },

    amountOfColumns: function() {
        var tpl = Template.instance();
        var smaller = Partup.client.screensize.current.get('width') < Partup.client.grid.getWidth(11) + 80;
        Meteor.defer(function() {
            tpl.partups.layout.rerender();
        });
        return smaller ? 3 : 4;
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
    rerenderLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.partups.layout.rerender = callback;
        };
    }
});
