Template.NewMessagePopup.onCreated(function(){
    var template = this;

    template.uploadingPhotos = new ReactiveVar(false);
    template.uploadedPhotos = new ReactiveVar([]);
});

// helpers
Template.NewMessagePopup.helpers({
    formSchema: Partup.schemas.forms.newMessage,
    placeholders: Partup.services.placeholders.newMessage,
    uploadingPhotos: function(){
        return Template.instance().uploadingPhotos.get();
    },
    uploadedPhotos: function(){
        return Template.instance().uploadedPhotos.get();
    }
});

// events
Template.NewMessagePopup.events({
    'click [data-browse-photos]': function eventClickBrowse(event, template){
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-photo-input]');
        input.click();
    },
    'change [data-photo-input]': function eventChangeFile(event, template){
        template.uploadingPhotos.set(true);
        FS.Utility.eachFile(event, function (file) {
            Partup.ui.uploader.uploadImage(file, function (error, image) {
                var uploaded = template.uploadedPhotos.get();
                uploaded.push(image._id);
                template.uploadedPhotos.set(uploaded);
                template.uploadingPhotos.set(false);
            });
        });
    },
    'click [data-close]': function clearForm(event, template){
        template.uploadedPhotos.set([]);
    },
    'click [data-remove-upload]': function removeUpload(event, template){
        var imageId = $(event.target).data('remove-upload');
        // template.uploadedPhotos.set([]);
        var uploadedPhotos = template.uploadedPhotos.get();
        mout.array.remove(uploadedPhotos, imageId);
        template.uploadedPhotos.set(uploadedPhotos);
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
            var uploadedPhotos = Template.instance().parent().uploadedPhotos.get();
            insertDoc.images = uploadedPhotos;
            Meteor.call('updates.messages.insert', partupId, insertDoc, function (error) {
                // Error
                if (error) {
                    Partup.ui.notify.error(error.reason);
                    self.done(new Error(error.message));

                    return;
                }
                Template.instance().parent().uploadedPhotos.set([]);
                // Success
                AutoForm.resetForm('newMessageForm');
                self.done();
                Partup.ui.popup.close();
            });

            return false;
        }
    }
});