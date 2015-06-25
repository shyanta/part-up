Template.modal_create_activities_copy.onRendered(function() {
    Meteor.typeahead.inject();
});

// Initialize selected Partup variable to store ID in when selected
var selectedPartup;

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_activities_copy.helpers({
    partups: function() {
        return Partups.find({_id: {$not: this.data.partupId}}).map(function(partup) {
            return {id: partup._id, value: partup.name};
        });
    },
    selected: function(event, suggestion) {
        selectedPartup = suggestion.id;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_create_activities_copy.events({
    'submit form': function(event, template) {
        return false;
    },
    'click [data-copyactivities]': function clickCopyActivities(event, template) {
        Meteor.call('activities.copy', selectedPartup, Router.current().params._id, function(error, result) {
            if (error) {
                return Partup.client.notify.error(__('pages-modal-create-activities-error-method-' + error.error));
            } else {
                template.find('[name=partup]').value = null;
                Partup.client.popup.close();
            }
        });
    }
});
