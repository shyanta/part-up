/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesStartPartupIntro.helpers({
    //
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesStartPartupIntro.events({
    'click [data-closepage]': function (event, template) {
        event.preventDefault();
        Router.go('home');
    }
});
