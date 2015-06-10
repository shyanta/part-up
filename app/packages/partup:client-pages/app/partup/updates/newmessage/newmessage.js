var placeholders = {
    'text': function() {
        return __('pages-app-partup-updates-newmessage-placeholder');
    }
};

Template.app_partup_updates_newmessage.onCreated(function() {
    var template = this;

    template.uploadingPhotos = new ReactiveVar(false);
    template.uploadedPhotos = new ReactiveVar([]);
    template.totalPhotos = new ReactiveVar(0);
    template.maxPhotos = 4;
});

// helpers
Template.app_partup_updates_newmessage.helpers({
    formSchema: Partup.schemas.forms.newMessage,
    placeholders: placeholders,
    uploadingPhotos: function() {
        return Template.instance().uploadingPhotos.get();
    },
    uploadedPhotos: function() {
        return Template.instance().uploadedPhotos.get();
    },
    photoLimitReached: function() {
        return (Template.instance().totalPhotos.get() === 4) ? true : false;
    }
});

// events
Template.app_partup_updates_newmessage.events({
    'click [data-browse-photos]': function eventClickBrowse(event, template) {
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-photo-input]');
        input.click();
    },
    'change [data-photo-input]': function eventChangeFile(event, template) {
        template.uploadingPhotos.set(true);
        var total = Template.instance().totalPhotos.get();
        FS.Utility.eachFile(event, function(file) {
            if (total === template.maxPhotos) return;

            Partup.client.uploader.uploadImage(file, function(error, image) {
                var uploaded = template.uploadedPhotos.get();
                uploaded.push(image._id);
                template.uploadedPhotos.set(uploaded);
                template.uploadingPhotos.set(false);
            });
            total++;
            Template.instance().totalPhotos.set(total);
        });
    },
    'click [data-dismiss]': function clearForm(event, template) {
        template.uploadedPhotos.set([]);
    },
    'click [data-remove-upload]': function removeUpload(event, template) {
        var imageId = $(event.target).data('remove-upload');
        // template.uploadedPhotos.set([]);
        var uploadedPhotos = template.uploadedPhotos.get();
        mout.array.remove(uploadedPhotos, imageId);
        template.uploadedPhotos.set(uploadedPhotos);
        var total = Template.instance().totalPhotos.get();
        total--;
        Template.instance().totalPhotos.set(total);
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    newMessageForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var partupId = Router.current().params._id;
            var self = this;
            var parent = Template.instance().parent()
            var uploadedPhotos = parent.uploadedPhotos.get();
            insertDoc.images = uploadedPhotos;

            Meteor.call('updates.messages.insert', partupId, insertDoc, function(error) {
                // Error
                if (error) {
                    Partup.client.notify.error(error.reason);
                    self.done(new Error(error.message));

                    return;
                }
                // Success
                AutoForm.resetForm('newMessageForm');
                self.done();
                parent.uploadedPhotos.set([]);
                Partup.client.popup.close();
            });

            return false;
        }
    }
});
