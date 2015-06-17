/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_forgotpassword.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        Partup.client.intent.return('login');
    }
});
