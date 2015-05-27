Template.CopyActivityPopup.onRendered(function () {
    Meteor.typeahead.inject();
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.CopyActivityPopup.helpers({
    formSchema: Partup.schemas.forms.copyActivities,
    placeholders: Partup.services.placeholders.startactivities,
    generateFormId: function () {
        return 'activityCopyForm-' + Router.current().params._id;
    },
    partups: function () {
        return Partups.find({}).map(function (partup) {
            return { id: partup._id, value: partup.name };
        });
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function (doc) {
        var partupId = Router.current().params._id;
        var self = this;

        Meteor.call('activities.copy', doc, partupId, function (error) {
            if (error && error.message) {
                Partup.ui.notify.error(error.reason);

                AutoForm.validateForm(self.formId);
                self.done(new Error(error.message));
                return;
            }

            Partup.ui.popup.close();
            self.done();
        });

        return false;
    }
});
