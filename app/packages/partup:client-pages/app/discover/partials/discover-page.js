var PAGING_INCREMENT = 12;

var getAmountOfColumns = function(screenwidth) {
    return screenwidth > Partup.client.grid.getWidth(11) + 80 ? 4 : 3;
};

Template.app_discover_page.onCreated(function() {
    var template = this;

    template.states = {
        loading_infinite_scroll: false,
        paging_end_reached: new ReactiveVar(false),
        count_loading: new ReactiveVar(false)
    };

    template.count = new ReactiveVar();

    template.columnTilesLayout = new Partup.client.constructors.ColumnTilesLayout({

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

    template.query;

    // When the page changes
    template.page = new ReactiveVar(0, function(previousPage, page) {
        template.query.limit = PAGING_INCREMENT;
        template.query.skip = page * PAGING_INCREMENT;
        template.query.userId = Meteor.userId(); // for caching purposes in nginx
        template.states.loading_infinite_scroll = true;

        Partup.client.API.get('/partups/discover' + mout.queryString.encode(template.query), function(error, data) {
            if (error || !data.partups || data.partups.length === 0) {
                template.states.loading_infinite_scroll = false;
                template.states.paging_end_reached.set(true);
                return;
            }

            var tiles = data.partups.map(function(partup) {
                return {
                    partup: partup
                };
            });

            template.columnTilesLayout.addTiles(tiles, function callback() {
                template.states.loading_infinite_scroll = false;
            });

            template.states.paging_end_reached.set(data.partups.length < PAGING_INCREMENT);
        });
    });

    // When the query changes
    template.autorun(function() {
        template.query = Partup.client.discover.composeQueryObject();
        template.query.userId = Meteor.userId(); // for caching purposes in nginx
        template.states.paging_end_reached.set(false);
        template.page.set(0);
        template.columnTilesLayout.clear();

        template.states.count_loading.set(true);
        HTTP.get('/partups/discover/count' + mout.queryString.encode(template.query), function(error, response) {
            template.states.count_loading.set(false);
            if (error || !response || !mout.lang.isString(response.content)) { return; }

            var content = JSON.parse(response.content);
            template.count.set(content.count);
        });
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
        if (template.states.loading_infinite_scroll || template.states.paging_end_reached.curValue) { return; }

        var nextPage = template.page.get() + 1;
        template.page.set(nextPage);
    });

});

Template.app_discover_page.helpers({
    columnTilesLayout: function() {
        return Template.instance().columnTilesLayout;
    },
    endReached: function() {
        return Template.instance().states.paging_end_reached.get();
    },
    count: function() {
        return Template.instance().count.get();
    },
    countLoading: function() {
        return Template.instance().states.count_loading.get();
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
