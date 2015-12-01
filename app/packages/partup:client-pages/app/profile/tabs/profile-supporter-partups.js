var PAGING_INCREMENT = 32;

var getAmountOfColumns = function(screenwidth) {
    return screenwidth > Partup.client.grid.getWidth(11) + 80 ? 4 : 3;
};

Template.app_profile_supporter_partups.onCreated(function() {
    console.log('created app_profile_supporter_partups');
    var template = this;

    // States such as loading states
    template.states = {
        loading_infinite_scroll: false,
        paging_end_reached: new ReactiveVar(false),
        count_loading: new ReactiveVar(false)
    };

    // Partup result count
    template.count = new ReactiveVar();

    // Get count
    template.states.count_loading.set(true);
    HTTP.get('/users/' + template.data.profileId + '/supporterpartups/count' + mout.queryString.encode({
        userId:  Meteor.userId(),
        token:  Accounts._storedLoginToken()
    }), function(error, response) {
        template.states.count_loading.set(false);
        if (error || !response || !mout.lang.isString(response.content)) { return; }

        var content = JSON.parse(response.content);
        template.count.set(content.count);
    });

    // Column layout
    template.columnTilesLayout = new Partup.client.constructors.ColumnTilesLayout({

        // This function will be called for each tile
        calculateApproximateTileHeight: function(tileData, columnWidth) {

            // The goal of this formula is to approach
            // the expected height of a tile as best
            // as possible, synchronously,
            // using the given partup object
            var BASE_HEIGHT = 308;
            var MARGIN = 18;

            var _partup = tileData.partup;

            var NAME_PADDING = 40;
            var NAMe_LINEHEIGHT = 22;
            var nameCharsPerLine = 0.099 * (columnWidth - NAME_PADDING);
            var nameLines = Math.ceil(_partup.name.length / nameCharsPerLine);
            var name = nameLines * NAMe_LINEHEIGHT;

            var DESCRIPTION_PADDING = 40;
            var DESCRIPTION_LINEHEIGHT = 22;
            var descriptionCharsPerLine = 0.145 * (columnWidth - DESCRIPTION_PADDING);
            var descriptionLines = Math.ceil(_partup.description.length / descriptionCharsPerLine);
            var description = descriptionLines * DESCRIPTION_LINEHEIGHT;

            var tribe = _partup.network ? 47 : 0;

            return BASE_HEIGHT + MARGIN + name + description + tribe;
        }

    });
});

Template.app_profile_supporter_partups.onRendered(function() {
    var template = this;

    // When the screen size alters
    template.autorun(function() {
        var screenWidth = Partup.client.screen.size.get('width');
        var columns = getAmountOfColumns(screenWidth);

        if (columns !== template.columnTilesLayout.columns.curValue.length) {
            template.columnTilesLayout.setColumns(columns);
        }
    });

    // When the page changes due to infinite scroll
    template.page = new ReactiveVar(false, function(previousPage, page) {

        // Add some parameters to the query
        var query = {};
        query.limit = PAGING_INCREMENT;
        query.skip = page * PAGING_INCREMENT;

        // Update state(s)
        template.states.loading_infinite_scroll = true;

        // Call the API for data
        HTTP.get('/users/' + template.data.profileId + '/supporterpartups' + mout.queryString.encode(query), {
            headers: {
                Authorization: 'Bearer ' + Accounts._storedLoginToken()
            }
        }, function(error, response) {
            if (error || !response.data.partups || response.data.partups.length === 0) {
                template.states.loading_infinite_scroll = false;
                template.states.paging_end_reached.set(true);
                return;
            }

            var result = response.data;
            template.states.paging_end_reached.set(result.partups.length < PAGING_INCREMENT);

            var tiles = result.partups.map(function(partup) {
                Partup.client.embed.partup(partup, result['cfs.images.filerecord'], result.networks, result.users);

                return {
                    partup: partup
                };
            });

            // Add tiles to the column layout
            template.columnTilesLayout.addTiles(tiles, function callback() {
                template.states.loading_infinite_scroll = false;
            });
        });
    });

    // Trigger first page to load
    template.page.set(0);

    // Infinite scroll
    Partup.client.scroll.infinite({
        template: template,
        element: template.find('[data-infinitescroll-container]'),
        offset: 1500
    }, function() {
        if (template.states.loading_infinite_scroll || template.states.paging_end_reached.curValue) { return; }

        var nextPage = template.page.get() + 1;
        template.page.set(nextPage);
    });
});

Template.app_profile_supporter_partups.onDestroyed(function() {
    console.log('destroyed app_profile_supporter_partups');
});

Template.app_profile_supporter_partups.helpers({
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
    firstname: function() {
        var user = Meteor.users.findOne(this.profileId);
        return User(user).getFirstname();
    }
});
