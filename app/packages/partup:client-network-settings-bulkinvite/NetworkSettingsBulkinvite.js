/**
 * Invite multiple uppers to a network at once, using a CSV file
 *
 * @module client-network-settings-bulkinvite
 * @param {Number} networkSlug    the slug of the network
 */

 Template.NetworkSettingsBulkinvite.onCreated(function() {
     var template = this;
     template.submitting = new ReactiveVar(false);
 });

Template.NetworkSettingsBulkinvite.helpers({
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
    },
    formSchema: function() {
        return Partup.schemas.forms.networkBulkinvite;
    },
    submitting: function() {
        return Template.instance().submitting.get();
    },
    defaultDoc: function() {
        var network = Networks.findOne({slug: this.networkSlug});

        return {
            message: __('network-settings-bulkinvite-message-prefill', {
                networkName: network.name,
                networkDescription: network.description,
                inviterName: Meteor.user().profile.name
            })
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

            // Meteor.call('networks.invite_by_email', template.data.networkId, insertDoc,
            //     function(error, result) {
                    parent.submitting.set(false);
            //         if (error) {
            //             return Partup.client.notify.error(__('base-errors-' + error.reason));
            //         }
            //         Partup.client.notify.success(__('network-settings-bulkinvite-success'));
            //         Partup.client.popup.close();
            //     });

            return false;
        }
    }
});
