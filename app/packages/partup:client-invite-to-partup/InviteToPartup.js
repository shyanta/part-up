/**
 * Render invite to part-up functionality
 *
 * @module client-invite-to-partup
 *
 */
Template.InviteToPartup.onCreated(function() {
    var template = this;
    template.submitting = new ReactiveVar(false);
});

Template.InviteToPartup.helpers({
    formSchema: Partup.schemas.forms.inviteUpper,
    submitting: function() {
        return Template.instance().submitting.get();
    },
    defaultDoc: function() {
        var partup = Partups.findOne(this.partupId);

        return {
            message: __('invite-to-partup-popup-message-prefill', {
                partupName: partup.name,
                inviterName: Meteor.user().profile.name
            })
        };
    }
});

AutoForm.hooks({
    inviteToPartupForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var template = self.template.parent();

            var parent = Template.instance().parent();
            parent.submitting.set(true);

            var partupId = template.data.partupId;
            console.log(partupId)

            Meteor.call('partup.invite_by_email', partupId, insertDoc,
                function(error, result) {
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
