Meteor.startup(function() {
    $('body').on('click', '.pu-tag', function(event) {
        if ($(event.currentTarget).hasClass('pu-tag-disableglobalclick')) return;

        Session.set('discover.query.textsearch', event.currentTarget.textContent);
        Router.go('discover');
    });
});
