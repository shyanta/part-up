Template.Header_nav.events({
    'click [data-start]': function(event) {
        event.preventDefault();

        Intent.go({route: 'create'}, function(slug) {

            if (slug) {
                Router.go('partup', {
                    slug: slug
                });
            } else {
                Router.go('discover');
            }
        });
    },
});

Template.Header_nav.helpers({
    showDiscover: function() {
        var user = Meteor.user();
        if (!user) return true;
        return !User(user).isMemberOfAnyNetwork() && !User(user).isMemberOfAnyPartup();
    }
});
