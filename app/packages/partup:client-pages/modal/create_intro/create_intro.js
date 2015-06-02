/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.modal_create_intro.helpers({
    'user': function helperUser () {
        return Meteor.user();
    },
    'first_name': function helpFirstName() {
        var user = Meteor.user();
        var username = user.profile.name || user.name;
        return Partup.ui.strings.firstName(username);
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_create_intro.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Partup.ui.intent.executeIntentCallback('start');
    }
});
