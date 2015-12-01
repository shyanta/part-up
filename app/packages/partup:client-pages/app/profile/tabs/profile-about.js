Template.app_profile_about.onCreated(function() {
    var template = this;

    // Column layout
    template.columnTilesLayout = new Partup.client.constructors.ColumnTilesLayout({

        // Initial amount of columns
        columns: 2,

        // This function will be called for each tile
        calculateApproximateTileHeight: function(tileData, columnWidth) {

            // The goal of this formula is to approach
            // the expected height of a tile as best
            // as possible, synchronously,
            // using the given partup object
            return 1;
        }

    });

    template.handle = null;
    template.refresh = function() {
        if (template.handle) template.handle.stop();

        template.handle = template.subscribe('tiles.profile', template.data.profileId, {
            onReady: function() {
                var tiles = Tiles.find({upper_id: template.data.profileId}).fetch();
                var user = Meteor.users.findOne(template.data.profileId);
                var isMine = Meteor.userId() === template.data.profileId;

                if (!tiles || !tiles.length && isMine) {
                    tiles.push({
                        type: 'image',
                        placeholder: true
                    });
                }

                var meurs = {};
                if (user.profile.meurs) {
                    meurs = user.profile.meurs;
                }

                if ((meurs.results && meurs.results.length) || isMine) {
                    tiles.unshift({
                        type: 'result',
                        user: user,
                        meurs: meurs
                    });
                }

                // Add tiles to the column layout
                template.columnTilesLayout.clear(function() {
                    template.columnTilesLayout.addTiles(tiles);
                });
            }
        });
    };

    // First run
    template.refresh();
});

Template.app_profile_about.helpers({
    columnTilesLayout: function() {
        return Template.instance().columnTilesLayout;
    }
});

Template.app_profile_about.events({
    'click [data-create-tile]': function(event, template) {
        event.preventDefault();
        var type = $(event.currentTarget).closest('[data-create-tile]').data('create-tile');
        Partup.client.popup.open({
            id: 'new-' + type
        }, function(result) {
            template.refresh();
        });
    },
    'click [data-start-test]': function(event, template) {
        event.preventDefault();
        Meteor.call('meurs.create_test', function(error, url) {
            if (url) document.location.href = url;
        });
    },
    'click [data-delete]': function(event, template) {
        event.preventDefault();
        var tile = this;
        var tileId = tile._id;
        Partup.client.prompt.confirm({
            title: __('pages-app-profile-about-tile-prompt-title'),
            message: __('pages-app-profile-about-tile-prompt-message'),
            onConfirm: function() {
                Meteor.call('tiles.remove', tileId, function(error, result) {
                    if (error) {
                        Partup.client.notify.error(__(error));
                        return;
                    }
                    Partup.client.notify.success('Tile removed');
                    template.refresh();
                });
            }
        });
    }

});

Template.app_profile_about.helpers({
    firstname: function() {
        var user = Meteor.users.findOne(this.profileId);
        return User(user).getFirstname();
    },
    isMine: function() {
        return this.profileId === Meteor.userId();
    }
});
