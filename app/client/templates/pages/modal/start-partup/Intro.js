/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesStartPartupIntro.helpers({
    'user': function helperUser () {
        return Meteor.user();
    },
    'first_name': function helpFirstName(){
        var user = Meteor.user();
        if(user.profile.name){
            return user.profile.name.split(' ')[0];
        } else if(user.name){
            return user.name.split(' ')[0];
        }
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
