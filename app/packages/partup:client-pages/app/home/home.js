var getAmountOfColumns = function(screenwidth) {
    if (screenwidth > Partup.client.grid.getWidth(11) + 80) {
        return 4;
    }

    if (screenwidth > Partup.client.grid.getWidth(6) + 80) {
        return 2;
    }

    return 1;
};

Template.app_home.onCreated(function() {
    var template = this;

    template.video = new ReactiveVar(false);

    // Column layout
    template.columnTilesLayout = new Partup.client.constructors.ColumnTilesLayout({

        // This function will be called for each tile
        calculateApproximateTileHeight: function(tileData, columnWidth) {

            // The goal of this formula is to approach
            // the expected height of a tile as best
            // as possible, synchronously,
            // using the given partup object
            return 1;
        }

    });

    // Featured partup
    template.featured_partup = new ReactiveVar();

    template.autorun(function() {
        var currentLanguage = Partup.client.language.current.get();
        if (currentLanguage == undefined) return;

        // Call first four discover part-ups and add them to the UI
        Partup.client.API.get('/partups/home/' + currentLanguage, {}, function(error, result) {
            if (error) return;

            var popular_partup_ids = lodash.pluck(get(result, 'partups'), '_id');
            var popular_partups = Partups.find({_id: {$in: popular_partup_ids}}).fetch();

            if (popular_partups.length > 0) {
                var tiles = popular_partups.map(function(partup) {
                    return {
                        partup: partup,
                        HIDE_TAGS: true
                    };
                });

                // Add tiles to the column layout
                template.columnTilesLayout.addTiles(tiles);
            }
        });

        // Call one featured part-up
        Partup.client.API.get('/partups/featured_one_random/' + currentLanguage, {}, function(error, result) {
            if (error) return;

            var featured_partup_ids = lodash.pluck(get(result, 'partups'), '_id');
            var featured_partup = Partups.findOne({_id: {$in: featured_partup_ids}});

            template.featured_partup.set(featured_partup);
        });
    });
});

Template.app_home.onRendered(function() {
    var template = this;

    // When the screen size alters
    template.autorun(function() {
        var screenWidth = Partup.client.screen.size.get('width');
        var columns = getAmountOfColumns(screenWidth);

        if (columns !== template.columnTilesLayout.columns.curValue.length) {
            template.columnTilesLayout.setColumns(columns);
        }
    });
});

Template.app_home.helpers({
    columnTilesLayout: function() {
        return Template.instance().columnTilesLayout;
    },
    featured_partup: function() {
        return Template.instance().featured_partup.get();
    },
    videoWatched: function() {
        return Session.get('home.videowatched');
    },
    greeting: function() {
        var daypart;
        var hour = moment().hours();

        if (hour < 6) daypart = 'night';
        else if (hour < 12) daypart = 'morning';
        else if (hour < 18) daypart = 'afternoon';
        else if (hour < 24) daypart = 'evening';
        else daypart = 'fallback';

        return __('pages-app-home-loggedin-greeting-' + daypart);
    },
    firstName: function() {
        return User(Meteor.user()).getFirstname();
    },

    // For the columnLayout for popular partups
    amountOfColumns: function() {
        var width = Partup.client.screen.size.get('width');

        var template = Template.instance();
        Meteor.defer(function() {
            template.popular_partups.layout.rerender();
        });

        if (width > 1024) return 4;
        if (width >= 600) return 2;
        return 1;
    },

    playVideo: function() {
        return Template.instance().video.get();
    }
});

Template.app_home.events({
    'click [data-start-video]': function(event, template) {
        event.preventDefault();
        template.video.set(true);
        Meteor.setTimeout(function() {
            Session.set('home.videowatched', true);
        }, 500);

        Partup.client.scroll.to(event.currentTarget, -30, {
            duration: 800
        });
    }
});
