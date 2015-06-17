/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_invite_to_partup.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        var partupId = Router.current().params._id;
        Partup.client.intent.return('partup-invite', {}, function() {
            Router.go('partup', {_id: partupId});
        });
    }
});
