/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_register.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        Partup.client.intent.return('register');
    }
});
