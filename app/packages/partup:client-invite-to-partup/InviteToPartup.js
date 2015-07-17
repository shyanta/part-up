// jscs:disable
/**
 * Render invite to partup functionality
 *
 * @module client-invite-to-partup
 *
 */
// jscs:enable
Template.InviteToPartup.helpers({
    formSchema: Partup.schemas.forms.inviteUpper
});

AutoForm.hooks({
    inviteUppersForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var template = self.template.parent();
            Meteor.call('activities.invite_by_email', template.data.activityId, insertDoc.email, insertDoc.name);
            Partup.client.popup.close();

            return false;
        }
    }
});
