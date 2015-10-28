var placeholders = {
    'description': function() {
        return __('pages-app-profile-description-placeholder');
    }
};
Template.NewPhotoTile.onCreated(function() {
    var template = this;
    template.uploadingPhoto = new ReactiveVar(false);
    template.imageId = new ReactiveVar();
    template.submitting = new ReactiveVar(false);
});
Template.NewPhotoTile.events({
    'click [data-image-browse], touchend [data-image-browse]': function(event, template) {
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-image-input]');
        input.click();
    },
    'change [data-image-input]': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            template.uploadingPhoto.set(true);

            Partup.client.uploader.uploadImage(file, function(error, image) {
                if (error) {
                    Partup.client.notify.error(__('profilesettings-form-image-error'));
                    template.uploadingPhoto.set(false);
                    return;
                }
                template.$('input[name=image]').val(image._id);
                template.imageId.set(image._id);

                template.uploadingPhoto.set(false);
            });

        });
    }
});
Template.NewPhotoTile.helpers({
    formSchema: Partup.schemas.forms.tile,
    placeholders: placeholders,
    uploadingPhoto: function() {
        return Template.instance().uploadingPhoto.get();
    },
    imageId: function() {
        return Template.instance().imageId.get();
    }
});
AutoForm.hooks({
    newPhotoForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var parent = Template.instance().parent();

            parent.submitting.set(true);
            Meteor.call('tiles.insert', insertDoc, function(error) {
                parent.submitting.set(false);

                // Error
                if (error) {
                    Partup.client.notify.error(error.reason);
                    self.done(new Error(error.message));

                    return;
                }

                // Success
                AutoForm.resetForm('newPhotoForm');
                self.done();
                Partup.client.popup.close();
            });

            return false;
        }
    }
});
