/**
 * Render invite to network functionality
 *
 * @module client-invite-to-network
 *
 */
Template.InviteToNetwork.onCreated(function() {
    var template = this;
    template.submitting = new ReactiveVar(false);
});

Template.InviteToNetwork.helpers({
    form: function() {
        var template = Template.instance();
        var network = Networks.findOne(template.data.networkId);
        var user = Meteor.user();
        return {
            schema: Partup.schemas.forms.inviteUpper,
            doc: function() {
                return {
                    message: TAPi18n.__('invite-to-network-popup-message-prefill', {
                        networkName: network.name,
                        networkDescription: network.description,
                        inviterName: Meteor.user().profile.name
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
    inviteToNetworkForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var template = self.template.parent();

            var parent = Template.instance().parent();
            parent.submitting.set(true);

            Meteor.call('networks.invite_by_email', template.data.networkId, insertDoc,
                function(error, result) {
                    parent.submitting.set(false);
                    if (error) {
                        return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
                    }
                    Partup.client.notify.success(TAPi18n.__('invite-to-network-popup-success'));
                    Partup.client.popup.close();
                });

            return false;
        }
    }
});
