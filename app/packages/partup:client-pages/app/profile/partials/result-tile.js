Template.ResultTile.helpers({
    resultTitle: function(id) {
        return __('pages-app-profile-about-result-' + id + '-title');
    },
    resultDescription: function(id) {
        return __('pages-app-profile-about-result-' + id + '-description');
    },
    resultIds: function() {
        var limited = [];
        this.result_ids.forEach(function(item, index) {
            if (index > 1) return;
            limited.push(item);
        });
        return limited;
    },
    hasResults: function() {
        return this.result_ids.length;
    }
});
