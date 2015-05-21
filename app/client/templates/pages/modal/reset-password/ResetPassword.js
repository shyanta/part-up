/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesResetPassword.helpers({
    //
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesResetPassword.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('reset-password');
    }
});
