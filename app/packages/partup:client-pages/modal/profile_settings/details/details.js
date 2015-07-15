/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    pagesModalProfileSettingsForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            Meteor.call('users.update', insertDoc, function(error, res) {
                if (error && error.message) {
                    Partup.client.notify.error(error.reason);
                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return;
                }

                self.done();
            });

            return false;
        }
    }
});
