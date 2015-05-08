/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetActivity.onCreated(function(){
    this.edit = new ReactiveVar(false);
    this.showDatePicker = new ReactiveVar(this.data.CREATE ? false : true);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetActivity.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.activity,
    generateFormId: function(){
        if (this.CREATE){
            return 'activityCreateForm';
        }
        return 'activityEditForm-' + this.activity._id;
    },
    showForm: function(){
        return !!this.CREATE || Template.instance().edit.get();
    },
    editMode: function(){
        return Template.instance().edit.get();
    },
    fieldsFromActivity: function(){
        return this.activity;
    },
    showDatePicker: function(){
        return Template.instance().showDatePicker.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetActivity.events({
    'click [data-edit]': function(event, template){
        template.edit.set(true);
        Partup.ui.datepicker.applyToInput(template, '.pu-datepicker', 500);
    },
    'click [data-end-date-button]': function(event, template){
        event.preventDefault();
        template.showDatePicker.set(true);
        Partup.ui.datepicker.applyToInput(template, '.pu-datepicker');
    },
    'click [data-remove]': function(event, template){
        var activityId = template.data.activity._id;
        Meteor.call('activities.archive', activityId, function(error){
            if (error){
                Partup.ui.notify.error(error.reason);
            }
        });
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc){
        var self = this;
        var template = this.template.parentTemplate();
        var activityId = template.data.activity._id;

        Meteor.call('activities.update', activityId, doc, function (error) {
            if (error && error.message){
                switch (error.message){
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

            template.edit.set(false);
            AutoForm.resetForm(self.formId);
            self.done();
        });

        return false;
    }
});
