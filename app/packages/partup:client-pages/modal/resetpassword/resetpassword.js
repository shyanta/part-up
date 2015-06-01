/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.modal_resetpassword.helpers({
    //
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_resetpassword.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('reset-password');
    }
});
