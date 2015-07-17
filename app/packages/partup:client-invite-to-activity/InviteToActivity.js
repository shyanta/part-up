// jscs:disable
/**
 * Render invite to partup functionality
 *
 * @module client-invite-to-partup
 *
 */
// jscs:enable
Template.InviteToActivity.helpers({
    formSchema: Partup.schemas.forms.inviteUpper
});

AutoForm.hooks({
    inviteUppersForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var template = self.template.parent();

            Meteor.call('activities.invite_by_email', template.data.activityId, insertDoc.email, insertDoc.name, function(error, result) {
                if (error) {
                    return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
                }
            });

            Partup.client.popup.close();

            return false;
        }
    }
});
