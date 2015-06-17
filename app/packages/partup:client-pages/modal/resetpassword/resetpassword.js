/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_resetpassword.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        Partup.client.intent.return('reset-password');
    }
});
