Template.ResultTile.helpers({
    resultTitle: function(id) {
        return __('pages-app-profile-about-result-' + id + '-title');
    },
    resultDescription: function(id) {
        return __('pages-app-profile-about-result-' + id + '-description', {name: Template.instance().data.user.profile.name});
    },
    results: function() {
        return this.results;
    },
    hasResults: function() {
        return this.results.length;
    },
    isCurrentusersResultTile: function() {
        return this.user._id === Meteor.userId();
    }
});

Template.ResultTile.events({
    'click [data-info]': function(event, template) {
        Partup.client.popup.open({
            id: 'info'
        }, function(result) {
            // template.tiles.refresh();
            console.log(result);
        });
    },
    'click [data-reset]': function(event, template) {
        Partup.client.prompt.confirm({
            title: __('pages-app-profile-about-result-reset-title'),
            message: __('pages-app-profile-about-result-reset-description'),
            onConfirm: function() {
                Meteor.call('meurs.reset', function(error) {
                    if (error) {
                        Partup.client.notify.error(error.reason);
                        return;
                    }
                    Partup.client.notify.success('profile reset');
                });
            }
        })
    }
});
