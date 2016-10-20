Template.InviteToPartup.onCreated(function() {
    var template = this;
    template.submitting = new ReactiveVar(false);
    template.invites = new ReactiveVar([{
        name: 'name',
        email: 'email'
    }]);
});

Template.InviteToPartup.helpers({
    form: function() {
        var template = Template.instance();
        var partup = Partups.findOne(template.data.partupId);
        if (!partup) return;
        var user = Meteor.user();
        return {
            schema: Partup.schemas.forms.inviteUpper,
            doc: function() {
                return {
                    message: TAPi18n.__('invite-to-partup-popup-message-prefill', {
                        partupName: partup.name,
                        inviterName: user.profile.name
                    })
                };
            },
            classNames: function() {
                var cNames = 'pu-form';
                if (!template.data.nopopup) cName += ' pu-form-popup';
                return cNames;
            }
        };
    },
    state: function() {
        var template = Template.instance();
        return {
            submitting: function() {
                return template.submitting.get();
            },
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

            Meteor.call('partups.invite_by_email', partupId, insertDoc,
                function(error, result) {
                    parent.submitting.set(false);
                    if (error) {
                        return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
                    }
                    Partup.client.notify.success(TAPi18n.__('invite-to-partup-popup-success'));
                    Partup.client.popup.close();
                });

            return false;
        }
    }
});
