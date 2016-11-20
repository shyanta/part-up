Template.app_discover.helpers({
    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    },
    showRecommendationsBtn: function() {
        var user = Meteor.user();
        return !!user;
    },
});
