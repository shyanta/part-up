/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesForgotPassword.helpers({
    //
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesForgotPassword.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('login');
    }
});