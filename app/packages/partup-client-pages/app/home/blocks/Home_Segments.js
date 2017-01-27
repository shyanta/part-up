Template.Home_Segments.events({
    'click [data-segment-start-button]': function(event, template) {

    },
    'click [data-segment-search-button]': function(event, template) {
        event.preventDefault();
        Router.go('discover');
    }
});
