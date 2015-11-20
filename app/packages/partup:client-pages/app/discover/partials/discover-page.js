/**
 * Content for the Discover-page
 * This template shows the partup-tiles and handles the infinite scroll
 */

var PAGING_INCREMENT = 24;

var getAmountOfColumns = function(screenwidth) {
    return screenwidth > Partup.client.grid.getWidth(11) + 80 ? 4 : 3;
};

Template.app_discover_page.onCreated(function() {
    this.columnTilesLayout = new Partup.client.constructors.ColumnTilesLayout({

        // This function will be called for each partup
        calculateApproximateTileHeight: function(partup, columnWidth) {

            // The goal of this formula is to approach
            // the expected height of a tile as best
            // as possible, synchronously,
            // using the given partup object
            var baseHeight = 301;
            var margin = 18;
            return baseHeight + margin;
        }

    });
});

Template.app_discover_page.onRendered(function() {
    var template = this;

    var columns = getAmountOfColumns(Partup.client.screen.size.keys.width);
    template.columnTilesLayout.setColumns(columns);

    template.states = {
        loading_infinite_scroll: false
    };

    template.query;
    template.paging_end_reached = false;

    // When the page changes
    template.page = new ReactiveVar(0, function(previousPage, page) {
        template.query.limit = PAGING_INCREMENT;
        template.query.skip = page * PAGING_INCREMENT;
        template.states.loading_infinite_scroll = true;
        Partup.client.discover.loading.set(true);

        Partup.client.API.get('/partups/discover' + mout.queryString.encode(template.query), function(error, data) {
            template.states.loading_infinite_scroll = false;
            Partup.client.discover.loading.set(false);
            if (error || !data.partups || data.partups.length === 0) { return; }

            template.paging_end_reached = data.partups.length < PAGING_INCREMENT;
            template.columnTilesLayout.addTiles(data.partups.map(function(partup) {
                return {
                    partup: partup
                };
            }));

        });
    });

    // When the query changes
    template.autorun(function() {
        template.query = Partup.client.discover.composeQueryObject();
        template.paging_end_reached = false;
        template.page.set(0);
        template.columnTilesLayout.clear();
    });

    // When the screen size alters
    template.autorun(function() {
        var screenWidth = Partup.client.screen.size.get('width');
        var columns = getAmountOfColumns(screenWidth);

        if (columns !== template.columnTilesLayout.columns.curValue.length) {
            template.columnTilesLayout.setColumns(columns);
        }
    });

    // Infinite scroll
    Partup.client.scroll.infinite({
        template: template,
        element: template.find('[data-infinitescroll-container]')
    }, function() {
        if (template.states.loading_infinite_scroll || template.paging_end_reached) {
            return;
        }

        var nextPage = template.page.get() + 1;
        template.page.set(nextPage);
    });

    // // The partups datamodel namespace
    // tpl.partups = {

    //     // States
    //     loading: new ReactiveVar(true),
    //     // infinitescroll_loading: new ReactiveVar(false),
    //     end_reached: new ReactiveVar(false),

    //     // Namespace for columns layout functions (added by helpers)
    //     layout: {
    //         items: [],
    //         count: new ReactiveVar(0)
    //     },

    //     // Only used to block all new calls (not as loading indicator)
    //     getting_data: tpl.data.getting_data,

    //     // Options reactive variable (on change, clear the layout and re-add all partups)
    //     options: tpl.data.query, // Reference to the passed query reactive-var
    //     onOptionsChange: function(options) {
    //         if (tpl.partups.getting_data.get() || !options) return;

    //         // Reset the limit reactive-var and the limit property of options
    //         tpl.partups.resetPage();
    //     },

    //     // Count
    //     count_handle: null,

    //     // Limit reactive variable (on change, add partups to the layout)
    //     page: new ReactiveVar(null, function(a, b) {
    //         if (tpl.partups.getting_data.get()) return;

    //         tpl.partups.getting_data.set(true);

    //         if (tpl.partups.count_handle) {
    //             tpl.partups.count_handle.stop();
    //         }

    //         var query = mout.object.deepFillIn(new Object(), tpl.partups.options.get(), {
    //             userId: Meteor.userId()
    //         });

    //         query = lodash(query).omit(lodash.isUndefined).omit(lodash.isNull).value();

    //         HTTP.get('/partups/discover/count' + mout.queryString.encode(query), function(error, response) {
    //             if (error || !response.data || response.data.error) return;
    //             tpl.partups.layout.count.set(response.data.count);
    //         });

    //         query = mout.object.deepFillIn(new Object(), query, {
    //             limit: Partup.client.discover.INCREMENT,
    //             skip: b * Partup.client.discover.INCREMENT
    //         });

    //         Partup.client.API.get('/partups/discover' + mout.queryString.encode(query), function(error, data) {
    //             if (error) return;

    //             var ids = lodash.pluck(data.partups, '_id');
    //             var partups = Partups.find({_id: {$in: ids}}).fetch();

    //             partups = lodash.sortBy(partups, function(partup) {
    //                 return this.indexOf(partup._id);
    //             }, ids);

    //             var end_reached = partups.length < Partup.client.discover.INCREMENT;
    //             tpl.partups.end_reached.set(end_reached);

    //             tpl.partups.loading_rendering = true;
    //             tpl.partups.layout.items = tpl.partups.layout.add(partupsToColumnTiles(partups), function() {
    //                 tpl.partups.loading_rendering = false;
    //             });

    //             tpl.partups.getting_data.set(false);
    //             tpl.partups.loading.set(false);
    //         });
    //     }),

    //     nextPage: function() {
    //         tpl.partups.page.set(tpl.partups.page.get() + 1);
    //     },

    //     resetPage: function() {
    //         tpl.partups.loading.set(true);
    //         tpl.partups.page.set(0);
    //         tpl.partups.end_reached.set(false);
    //         tpl.partups.layout.clear();
    //     }
    // };

    // // Fire onOptionsChange when the options change
    // tpl.autorun(function() {
    //     var options = tpl.partups.options.get();

    //     Tracker.nonreactive(function() {
    //         tpl.partups.onOptionsChange(options);
    //     });
    // });
});

/**
 * Discover-page helpers
 */
Template.app_discover_page.helpers({
    columnTilesLayout: function() {
        return Template.instance().columnTilesLayout;
    },
    // columnsLayout: function() {
    //     Template.instance().columnsLayout;
    // },
    // count: function() {
    //     return Template.instance().partups.layout.count.get() || '';
    // },
    // showProfileCompletion: function() {
    //     var user = Meteor.user();
    //     if (!user) return false;
    //     if (!user.completeness) return false;
    //     return user.completeness < 100;
    // },
    // profileCompletion: function() {
    //     var user = Meteor.user();
    //     if (!user) return false;
    //     if (!user.completeness) return '...';
    //     return user.completeness;
    // },
    // partupsLoading: function() {
    //     var tpl = Template.instance();
    //     return tpl.partups.loading.get();
    // },

    // amountOfColumns: function() {
    //     var template = Template.instance();
    //     var small = Partup.client.screen.size.get('width') < Partup.client.grid.getWidth(11) + 80;

    //     // Meteor.defer(function() {
    //     //     template.columns.rerender();
    //     // });

    //     return small ? 3 : 4;
    // },

    // // We use this trick to be able to call a function in a child template.
    // // The child template directly calls 'addToLayoutHook' with a callback.
    // // We save that callback, so we can call it later and the child template can react to it.
    // addToLayoutHook: function() {
    //     var tpl = Template.instance();

    //     return function registerCallback(callback) {
    //         tpl.partups.layout.add = callback;
    //     };
    // },
    // clearLayoutHook: function() {
    //     var tpl = Template.instance();

    //     return function registerCallback(callback) {
    //         tpl.partups.layout.clear = callback;
    //     };
    // },
    // rerenderLayoutHook: function() {
    //     var tpl = Template.instance();

    //     return function registerCallback(callback) {
    //         tpl.partups.layout.rerender = callback;
    //     };
    // }
});

Template.app_discover_page.events({
    // 'click [data-open-profilesettings]': function(event, template) {
    //     event.preventDefault();

    //     Intent.go({
    //         route: 'profile-settings',
    //         params: {
    //             _id: Meteor.userId()
    //         }
    //     });
    // }
});
