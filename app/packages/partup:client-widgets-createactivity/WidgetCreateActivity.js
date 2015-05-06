var showDatePicker = new ReactiveVar(false);
var maxNameCount = Partup.schemas.forms.startActivities._schema.name.max;
var maxDescriptionCount = Partup.schemas.forms.startActivities._schema.description.max;

var charactersLeft = new ReactiveDict();
charactersLeft.set('name', maxNameCount);
charactersLeft.set('description', maxDescriptionCount);

Template.WidgetCreateActivity.helpers({
    Partup: Partup,
    formSchema: Partup.schemas.forms.startActivities,
    placeholders: Partup.services.placeholders.startactivities,

    showDatePicker: function helperShowDatePicker () {
        return showDatePicker.get();
    },
    nameCharactersLeft: function() {
        return charactersLeft.get('name');
    },
    descriptionCharactersLeft: function() {
        return charactersLeft.get('description');
    }
})
Template.WidgetCreateActivity.events({
    'click [data-end-date-button]': function eventClickEndDateButton (event, template) {
        event.preventDefault();
        showDatePicker.set(true);
        Partup.ui.datepicker.applyToInput(template, '.pu-datepicker');
    },
    'keyup [data-max]': function updateMax(event, template){
        var max = eval($(event.target).data("max"));
        var charactersLeftVar = $(event.target).data("characters-left-var");
        charactersLeft.set(charactersLeftVar, max - $(event.target).val().length);
    },
})
AutoForm.hooks({
    activityForm: {
        onSubmit: function (insertDoc) {
            var self = this;
            var partupId = Session.get('partials.start-partup.current-partup') || Router.current().params._id;

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
                charactersLeft.set('name', maxNameCount);
                charactersLeft.set('description', maxDescriptionCount);
                self.done();

                // $('html, body').animate({
                //     scrollTop: $("#activityForm").offset().top - 37
                // }, 500);
            });

            return false;
        }
    }
});