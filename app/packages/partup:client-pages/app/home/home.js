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

    template.states = {
        popular_partups_loading: new ReactiveVar(false)
    };

    template.video = new ReactiveVar(false);

    // Featured partup
    template.featured_partup = new ReactiveVar();

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

    // Popular partups
    template.autorun(function() {
        var currentLanguage = Partup.client.language.current.get();
        if (currentLanguage == undefined) return;

        // Call first four discover part-ups and add them to the UI
        template.states.popular_partups_loading.set(true);
        Partup.client.API.get('/partups/home/' + currentLanguage, {}, function(error, result) {
            if (error || !result.partups || result.partups.length === 0) {
                template.states.popular_partups_loading.set(false);
                return;
            }

            var tiles = result.partups.map(function(partup) {
                Partup.client.embed.partup(partup, result['cfs.images.filerecord'], result.networks, result.users);

                return {
                    partup: partup,
                    HIDE_TAGS: true
                };
            });

            // Add tiles to the column layout
            template.columnTilesLayout.addTiles(tiles, function() {
                template.states.popular_partups_loading.set(false);
            });
        });

        // Call one featured part-up
        Partup.client.API.get('/partups/featured_one_random/' + currentLanguage, {}, function(error, result) {
            if (error || !result.partups || result.partups.length === 0) {
                return;
            }

            var partup = result.partups.pop();
            Partup.client.embed.partup(partup, result['cfs.images.filerecord'], result.networks, result.users);
            template.featured_partup.set(partup);
        });
    });
});

Template.app_home.helpers({
    columnTilesLayout: function() {
        return Template.instance().columnTilesLayout;
    },
    featured_partup: function() {
        var partupVar = Template.instance().featured_partup;
        if (!partupVar) { return; }

        return partupVar.get();
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
    playVideo: function() {
        return Template.instance().video.get();
    },
    popularPartupsLoading: function() {
        return Template.instance().states.popular_partups_loading.get();
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
