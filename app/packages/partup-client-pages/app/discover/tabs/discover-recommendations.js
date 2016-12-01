Template.app_discover_recommendations.onCreated(function() {
    var template = this;

    // States such as loading states
    template.states = {
        loading: new ReactiveVar(true),
        recommendation_results: new ReactiveVar([])
    };

    // Column layout
    template.columnTilesLayout = new Partup.client.constructors.ColumnTilesLayout({

        columnMinWidth: 277,
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

Template.app_discover_recommendations.onRendered(function() {
    var template = this;
    var PAGING_INCREMENT = 20;

    // Current query placeholder
    template.query;

    // When the page changes due to infinite scroll
    template.partupsXMLHttpRequest = null;

    // Cancel possibly ongoing request
    if (template.partupsXMLHttpRequest) {
        template.partupsXMLHttpRequest.abort();
        template.partupsXMLHttpRequest = null;
    }

    // Add some parameters to the query
    var query = mout.object.deepFillIn({}, template.query);
    query.limit = PAGING_INCREMENT;
    query.skip = 0;
    query.userId = Meteor.userId();
    query.token = Accounts._storedLoginToken();
    // Update state(s)

    // Call the API for data
    HTTP.get('/partups/recommendations' + mout.queryString.encode(query), {
        beforeSend: function(_request) {
            template.partupsXMLHttpRequest = _request;
        }
    }, function(error, response) {
        console.log('RECOMMENDATIONS RESPONSE:', response);
        template.states.loading.set(false);
        template.partupsXMLHttpRequest = null;
        if (error || !response.data.partups || response.data.partups.length === 0) return;

        // response.data contains all (is 4 at this moment) part-ups and related users //TODO: nog relevant???
        // important: the part-ups are not necessiraly sorted according the api-order
        var result = response.data;

        template.states.recommendation_results.set(result.partups);

        var tiles = result.partups.map(function(partup) {
            Partup.client.embed.partup(partup, result['cfs.images.filerecord'], result.networks, result.users);

            return {
                partup: partup
            };
        });

        // Add tiles to the column layout
        template.columnTilesLayout.addTiles(tiles, _.noop);
    });
});

Template.app_discover_recommendations.helpers({
    haveRecommendations: function() {
        return !!Template.instance().states.recommendation_results.get().length;
    },
    columnTilesLayout: function() {
        return Template.instance().columnTilesLayout;
    },
    loading: function() {
        return Template.instance().states.loading.get();
    }
});

