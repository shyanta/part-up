Template.ResultTile.helpers({
    resultTitle: function(id) {
        return __('pages-app-profile-about-result-' + id + '-title');
    },
    resultDescription: function(id) {
        return __('pages-app-profile-about-result-' + id + '-description', {name: Template.instance().data.user.profile.name});
    },
    results: function() {
        return this.meurs.results;
    },
    hasResults: function() {
        return this.meurs.results.length && this.meurs.fetched_results;
    },
    isCurrentusersResultTile: function() {
        return this.user._id === Meteor.userId();
    },
    isLoading: function() {
        // when no results are fetched and there is a session_id
        // then it means the user initiates a test
        var loading = !this.meurs.fetched_results && this.meurs.program_session_id;
        return loading;
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
