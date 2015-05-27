Template.CopyActivityPopup.onRendered(function() {
    Meteor.typeahead.inject();
});

// Initialize selected Partup variable to store ID in when selected
var selectedPartup;

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.CopyActivityPopup.helpers({
    partups: function () {
        return Partups.find({}).map(function (partup) {
            return { id: partup._id, value: partup.name };
        });
    },
    selected: function(event, suggestion) {
        selectedPartup = suggestion.id;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.CopyActivityPopup.events({
    'submit form': function(event, template) {
        return false;
    },
    'click [data-copyactivities]': function clickCopyActivities(event, template) {
        Meteor.call('activities.copy', selectedPartup, Router.current().params._id, function (error, result) {
            if (error) {
                return Partup.ui.notify.iError('error-method-' + error.reason);
            } else {
                template.find('[name=partup]').value = null;
                Partup.ui.popup.close();
            }
        });
    }
});