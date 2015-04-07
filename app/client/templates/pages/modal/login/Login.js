/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesLogin.helpers({
    //
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesLogin.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Partup.ui.modal.executeIntentCallback('login');
    }
});
