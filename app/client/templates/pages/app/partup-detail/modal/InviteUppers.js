Template.PagesPartupInviteUppers.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Router.go('partup-detail', {_id: Router.current().params._id});
    }
});
