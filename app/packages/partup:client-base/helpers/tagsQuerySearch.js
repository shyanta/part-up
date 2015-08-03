Meteor.startup(function() {
    $('body').on('click', '.pu-tag', function(event) {
        Session.set('discover.query', event.target.textContent);
        Router.go('discover');
    });
});
