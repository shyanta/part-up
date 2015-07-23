var placeholders = {
    'name': function() {
        return __('pages-modal-create-details-form-name-placeholder');
    }
};

Template.modal_create_network.helpers({
    privacyTypeOptions: function() {
        return [
            {
                label: 'Public',
                value: 1
            },
            {
                label: 'Invite',
                value: 2
            },
            {
                label: 'Closed',
                value: 3
            },
        ];
    },
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_create_network.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Intent.return('create-network');
    },
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    createNetworkForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            Meteor.call('networks.insert', insertDoc, function(error, networkId) {
                if (error) {
                    Partup.client.notify.error('unauthorized or error');
                    return;
                }
                Partup.client.notify.success('Tribe inserted correctly');
            });

            return false;
        }
    }
});

