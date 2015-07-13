/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_invite_to_partup.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        Intent.return('partup-invite', {
            fallback_route: {
                name: 'partup',
                params: {
                    _id: template.data.partupId
                }
            }
        });
    }
});
