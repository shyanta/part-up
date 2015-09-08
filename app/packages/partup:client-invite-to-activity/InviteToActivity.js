/**
 * Render invite to part-up activity functionality
 *
 * @module client-invite-to-partup-activity
 *
 */
Template.InviteToActivity.onCreated(function() {
    var template = this;
    template.submitting = new ReactiveVar(false);
});

Template.InviteToActivity.helpers({
    formSchema: Partup.schemas.forms.inviteUpper,
    submitting: function() {
        return Template.instance().submitting.get();
    }
});

AutoForm.hooks({
    inviteUppersForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var template = self.template.parent();

            var parent = Template.instance().parent();
            parent.submitting.set(true);

            Meteor.call('activities.invite_by_email', template.data.activityId, insertDoc.email, insertDoc.name, function(error, result) {
                parent.submitting.set(false);
                if (error) {
                    return Partup.client.notify.error(__('base-errors-' + error.reason));
                }
                Partup.client.notify.success(__('invite-to-activity-popup-success'));
                Partup.client.popup.close();
            });

            return false;
        }
    }
});
