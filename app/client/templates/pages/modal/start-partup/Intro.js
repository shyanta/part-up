/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesStartPartupIntro.helpers({
    'user': function helperUser () {
        return Meteor.user();
    },
    'first_name': function helpFirstName(){
        var user = Meteor.user();
        var username = user.profile.name || user.name;
        return Partup.ui.strings.firstName(username);
    }
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesStartPartupIntro.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('start');
    },
    'click [data-start-new]': function startPartup(event,template){
        Session.set('partials.start-partup.current-partup', undefined);
        Router.go('start-details');
    }
});
