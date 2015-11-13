Template.ResultTile.helpers({
    resultTitle: function(id) {
        return __('pages-app-profile-about-result-' + id + '-title');
    },
    resultDescription: function(id) {
        return __('pages-app-profile-about-result-' + id + '-description');
    },
    results: function() {
        return this.results;
    },
    hasResults: function() {
        return this.results.length;
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
    }
});
