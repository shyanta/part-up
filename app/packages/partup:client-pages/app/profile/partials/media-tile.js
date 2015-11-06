Template.MediaTile.helpers({
    embedSettings: function() {
        return this.embedSettings();
    },

    isCurrentusersMediaTile: function() {
        return this.upper_id === Meteor.userId();
    }
});

Template.MediaTile.events({
    'click [data-delete]': function(event, template) {
        var tileId = template.data._id;
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
                });
            }
        });
    }
});
