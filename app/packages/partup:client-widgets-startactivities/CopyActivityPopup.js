/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.CopyActivityPopup.helpers({
    partups: function () {
        return Partups.find().fetch().map(function (partup) {
            console.log(partup.name);
            return { id: partup._id, value: partup.name };
        });
    }
});

Template.CopyActivityPopup.rendered = function() {
    Meteor.typeahead.inject();
};

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.CopyActivityPopup.events({
    'click [data-copyactivities]': function clickCopyActivities(event, template) {
        Meteor.call('activities.copy', template.find('[name=partup]').value, Router.current().params._id);
    }
});