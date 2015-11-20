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
        if (this.user._id === Meteor.userId()) {
            if (!this.meurs || !this.meurs.fetched_results) return false;
        }
        if (!this.meurs) return false;
        return this.meurs.results.length;
    },
    isCurrentusersResultTile: function() {
        return this.user._id === Meteor.userId();
    },
    isLoading: function() {
        return this.meurs.initiating_test && !this.meurs.fetched_results;
    }
});

Template.ResultTile.events({
    'click [data-info]': function(event, template) {
        event.preventDefault();
        Partup.client.popup.open({
            id: 'info'
        }, function(result) {
            // template.tiles.refresh();
            console.log(result);
        });
    },
    'click [data-reset]': function(event, template) {
        event.preventDefault();
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
