/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesRegister.helpers({
    //
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesRegister.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('register');
    }
});
