var placeholders = {
    'name': function() {
        return __('pages-modal-create-details-form-name-placeholder');
    },
    'description': function() {
        return __('pages-modal-create-details-form-description-placeholder');
    },
    'tags_input': function() {
        return __('pages-modal-create-details-form-tags_input-placeholder');
    },
    'location_input': function() {
        return __('pages-modal-create-details-form-location_input-placeholder');
    }
};

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_create_network.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        //Partup.client.intent.executeIntentCallback('admin');
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
                    Log.error(error);
                }
                Log.debug(networkId);
            });
            //Partup.client.popup.close();

            return false;
        }
    }
});

