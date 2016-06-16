/*************************************************************/
/* Page on Created */
/*************************************************************/
Template.modal_recommendations.onCreated(function() {
    var recommData = [
      1,
      2,
      3,
      4,
    ];
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
// Template.modal_recommendations.helpers({
//     'user': function helperUser() {
//         return Meteor.user();
//     },
//     'first_name': function helpFirstName() {
//         var user = Meteor.user();
//         return User(user).getFirstname();
//     }
// });

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_recommendations.events({
    'click [data-closepage]': function eventClickClosePage(event, template) {
        event.preventDefault();
        Intent.return('discover');
    }
});
