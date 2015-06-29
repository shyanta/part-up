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
            Meteor.call('partups.invite', Router.current().params._id, insertDoc.email, insertDoc.name);
            Partup.client.popup.close();

            return false;
        }
    }
});
