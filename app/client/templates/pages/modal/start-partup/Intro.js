/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesStartPartupIntro.helpers({
    'user': function helperUser () {
        return Meteor.user();
    }
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesStartPartupIntro.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Router.go('home');
    }
});
