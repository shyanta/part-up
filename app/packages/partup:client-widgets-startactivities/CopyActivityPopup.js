Template.CopyActivityPopup.onRendered(function() {
    Meteor.typeahead.inject();
});


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.CopyActivityPopup.helpers({
    partups: function () {
        return Partups.find({}).map(function (partup) {
            console.log(partup);
            return { id: partup._id, value: partup.name };
        });
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.CopyActivityPopup.events({
    'click [data-copyactivities]': function clickCopyActivities(event, template) {
        Meteor.call('activities.copy', template.find('[name=partup]').value, Router.current().params._id);
    }
});