Meteor.startup(function() {
    $('body').on('click', '.pu-tag', function(event) {
        if ($(event.currentTarget).hasClass('pu-tag-disable')) return;
        event.preventDefault();
        if ($(event.currentTarget).hasClass('pu-tag-disableglobalclick')) return;

        Partup.client.discover.setPrefill('textSearch', event.currentTarget.textContent);
        Router.go('discover');
    });
});
