/**
 * Content for the Discover-page
 * This template shows the partup-tiles and handles the infinite scroll
 *
 * @param query {ReactiveVar} - The reactive-var for the query
 */

 /**
  * Discover-page cache
  */
Meteor.call('partups.discover', Partup.client.discover.DEFAULT_QUERY, function(error, ids) {
    if (error || !ids) return;

    var sliced_ids = ids.slice(0, 24); // todo: fix hardcoded 24

    var sub = Meteor.subscribe('partups.by_ids', sliced_ids);
    Meteor.autorun(function(comp) {
        if (!sub.ready()) return;
        comp.stop();

        Partup.client.discover.cache.partup_ids = ids;
    });
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
        sub: undefined,

        // Current ids placeholder
        current_ids: [],

        // Update
        updateLayout: function(ids, options) {
            options = options || {};

            // Get current partups by given ids
            var partups = Partups.find({_id: {$in: ids}}).fetch();

            if (options.reset) {

                // Remove all rendered partups
                tpl.partups.layout.items = tpl.partups.layout.clear();

            } else {

                // Get rendered partups
                var renderedPartups = tpl.partups.layout.items;

                // Differentiate the partups to find the new ones
                partups = mout.array.filter(partups, function(partup) {
                    return !mout.array.find(renderedPartups, function(_partup) {
                        return partup._id === _partup._id;
                    });
                });

                // Determine whether this is the end (for infinite scroll)
                tpl.partups.end_reached.set(partups.length === 0);
            }

            // Sort retrieved partups by the order of the given ids array
            partups = lodash.sortBy(partups, function(partup) {
                return this.indexOf(partup._id);
            }, ids);

            // Render the partups
            tpl.partups.layout.items = tpl.partups.layout.add(partups);
        },

        // Query reactive variable (on change, clear the layout and re-add all partups)
        query: tpl.data.query, // Reference to the passed query reactive-var
        onQueryChange: function(query) {
            if (!query) return;

            // Reset the limit reactive-var and the limit property of query
            tpl.partups.resetLimit();

            // Call the partup ids
            tpl.partups.loading.set(true);
            Meteor.call('partups.discover', query, function(error, partupIds) {
                if (error || !partupIds) return;

                tpl.partups.current_ids = partupIds;

                tpl.partups.layout.count.set(partupIds.length);

                var sliced_ids = partupIds.slice(0, tpl.partups.STARTING_LIMIT);

                var is_plain_query = mout.object.equals(query, Partup.client.discover.DEFAULT_QUERY);

                // When this is a plain query ...
                if (is_plain_query) {

                    // And the cache is the same as the current result ...
                    if (mout.array.equals(Partup.client.discover.cache.partup_ids, partupIds)) {
                        tpl.partups.loading.set(false);

                        if (!Partup.client.discover.cache.rendered) {
                            Partup.client.discover.cache.rendered = true;
                            tpl.partups.updateLayout(sliced_ids, {reset: true}); // ... render the partups from the cache
                        }

                        return;
                    } else {
                        Partup.client.discover.cache.rendered = false; // ... otherwise, unset the Partup.client.discover.cache.
                        Partup.client.discover.cache.partup_ids = [];
                    }
                }

                var oldsub = tpl.partups.sub;
                tpl.partups.sub = Meteor.subscribe('partups.by_ids', sliced_ids);

                tpl.autorun(function(comp) {
                    if (!tpl.partups.sub.ready()) return;
                    comp.stop();

                    if (oldsub) oldsub.stop();
                    tpl.partups.loading.set(false);
                    tpl.partups.updateLayout(sliced_ids, {reset: true});

                    if (is_plain_query) {
                        Partup.client.discover.cache.partup_ids = tpl.partups.current_ids;
                        Partup.client.discover.cache.rendered = true;
                    } else {
                        Partup.client.discover.cache.rendered = false;
                    }
                });
            });
        },

        // Limit reactive variable (on change, add partups to the layout)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(old_limit, new_limit) {
            var first = new_limit === tpl.partups.STARTING_LIMIT;
            if (first) return;

            var sliced_ids = tpl.partups.current_ids.slice(0, new_limit);
            tpl.partups.infinitescroll_loading.set(true);

            var oldsub = tpl.partups.sub;
            tpl.partups.sub = Meteor.subscribe('partups.by_ids', sliced_ids);

            tpl.autorun(function(comp) {
                if (!tpl.partups.sub.ready()) return;
                comp.stop();

                if (oldsub) oldsub.stop();
                tpl.partups.loading.set(false);
                tpl.partups.updateLayout(sliced_ids, {reset: false});
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

    // Fire onQueryChange when the query change
    tpl.autorun(function() {
        tpl.partups.onQueryChange(tpl.partups.query.get());
    });
});

/**
 * Discover-page rendered
 */
Template.app_discover_page.onRendered(function() {
    var tpl = this;

    // Infinite scroll
    Partup.client.scroll.infinite({
        template: tpl,
        element: tpl.find('[data-infinitescroll-container]')
    }, function() {
        if (tpl.partups.loading.get() || tpl.partups.infinitescroll_loading.get() || tpl.partups.end_reached.get()) return;
        tpl.partups.increaseLimit();
    });

    // Set initial layout from cache
    if (Partup.client.discover.cache.partup_ids.length && !Partup.client.discover.cache.rendered) {
        tpl.partups.updateLayout(Partup.client.discover.cache.partup_ids, {reset: true});
        Partup.client.discover.cache.rendered = true;
    }
});

Template.app_discover_page.onDestroyed(function() {
    Partup.client.discover.cache.rendered = false;
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

Template.app_discover_page.events({
    'click [data-open-profilesettings]': function(event, template) {
        event.preventDefault();

        Intent.go({
            route: 'profile-settings',
            params: {
                _id: Meteor.userId()
            }
        });
    }
});
