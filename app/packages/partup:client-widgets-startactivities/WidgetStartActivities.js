/*************************************************************/
/* Widget initial */
/*************************************************************/
var showDatePicker = new ReactiveVar(false);

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartActivities.helpers({
    Partup: Partup,
    formSchema: Partup.schemas.forms.startActivities,
    placeholders: Partup.services.placeholders.startactivities,
    partupActivities: function helperPartupActivities () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
    },
    currentPartupId: function helperCurrentPartupId () {
        return Session.get('partials.start-partup.current-partup');
    },
    showDatePicker: function helperShowDatePicker () {
        return showDatePicker.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartActivities.events({
    'click [data-end-date-button]': function eventClickEndDateButton (event, template) {
        event.preventDefault();
        showDatePicker.set(true);
        Partup.ui.datepicker.applyToInput(template, '.pu-datepicker');
        
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    activityForm: {
        onSubmit: function (insertDoc) {
            var self = this;
            var partupId = Session.get('partials.start-partup.current-partup');

            Meteor.call('activities.insert', partupId, insertDoc, function (error) {
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
                
                showDatePicker.set(false);
                AutoForm.resetForm('activityForm');
                self.done();
            });

            return false;
        }
    }
});