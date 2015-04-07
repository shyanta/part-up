/*************************************************************/
/* Widget initial */
/*************************************************************/
var activityEditModes = new ReactiveDict();

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Activity.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.startactivities,
    generateFormId: function() {
        return "activityEditForm-" + this._id;
    },
    editMode: function(){
        return activityEditModes.get(this._id);
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Activity.events({
    'click [data-edit]': function(event, template){
        activityEditModes.set(template.data._id, true);

		Partup.ui.datepicker.applyToInput(template, '.pu-datepicker');
    },
    'click [data-remove]': function (event, template){
        var activityId = template.data._id;
        Meteor.call('activities.remove', activityId, function (error) {
            if (error) {
                Partup.ui.notify.error(error.reason);
            }
        });
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc) {
        var self = this;
        var formNameParts = self.formId.split('-');
        if(formNameParts.length !== 2 || formNameParts[0] !== 'activityEditForm') return;

        var activityId = formNameParts[1];

        Meteor.call('activities.update', activityId, doc, function (error) {

            // Error
            if(error && error.message) {
                switch (error.message) {
                    // case 'User not found [403]':
                    //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                    //     break;
                    default:
                        Partup.ui.notify.error(error.reason);
                }
                AutoForm.validateForm(self.formId);
                self.done(new Error(error.message));
                return;
            }

            // Success
            activityEditModes.set(activityId, false);
            AutoForm.resetForm('activityEditForm');
            self.done();

        });

        return false;
    }
});