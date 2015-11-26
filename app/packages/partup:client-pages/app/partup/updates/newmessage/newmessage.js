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
    template.submitting = new ReactiveVar(false);
});

Template.app_partup_updates_newmessage.onRendered(function() {
    this.input = this.find('[name=text]');
    this.mentionsInput = Partup.client.forms.MentionsInput(this.input, this.data.partupId);
});

Template.app_partup_updates_newmessage.onDestroyed(function() {
    var tpl = this;
    tpl.mentionsInput.destroy();
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
        return Template.instance().totalPhotos.get() === 4;
    },
    submitting: function() {
        return Template.instance().submitting.get();
    }
});

// events
Template.app_partup_updates_newmessage.events({
    'click [data-browse-photos], touchend [data-browse-photos]': function eventClickBrowse(event, template) {
        event.preventDefault();

        // in stead fire click event on file input
        var input = $('input[data-photo-input]');
        input.click();
    },
    'change [data-photo-input]': function eventChangeFile(event, template) {
        template.uploadingPhotos.set(true);
        var total = Template.instance().totalPhotos.get();
        Partup.client.uploader.eachFile(event, function(file) {
            if (total === template.maxPhotos) return;

            Partup.client.uploader.uploadImage(file, function(error, image) {
                template.uploadingPhotos.set(false);
                if (error) {
                    Partup.client.notify.error(TAPi18n.__(error.reason));
                    return;
                }
                var uploaded = template.uploadedPhotos.get();
                uploaded.push(image._id);
                template.uploadedPhotos.set(uploaded);
            });
            total++;
            Template.instance().totalPhotos.set(total);
        });
    },
    'click [data-dismiss]': function clearForm(event, template) {
        template.uploadedPhotos.set([]);
    },
    'click [data-remove-upload]': function removeUpload(event, template) {
        var imageId = $(event.currentTarget).data('remove-upload');
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
            var self = this;
            var parent = Template.instance().parent();
            var template = self.template.parent();

            parent.submitting.set(true);

            var partupId = parent.data.partupId;
            var uploadedPhotos = parent.uploadedPhotos.get();
            insertDoc.images = uploadedPhotos;
            insertDoc.text = parent.mentionsInput.getValue();

            // close popup before call is made, an error notifier
            // will be the feedback when it fails
            Partup.client.popup.close();

            Meteor.call('updates.messages.insert', partupId, insertDoc, function(error, result) {
                parent.submitting.set(false);

                // Error
                if (error) {
                    Partup.client.notify.error(error.reason);
                    self.done(new Error(error.message));

                    return;
                }
                if (result.warning) {
                    Partup.client.notify.warning(__('warning-' + result.warning));
                }

                // Success
                analytics.track('new message created', {
                    partupId: partupId
                });
                AutoForm.resetForm('newMessageForm');
                template.mentionsInput.reset();
                self.done();
                parent.uploadedPhotos.set([]);
                Partup.client.events.emit('partup:updates:message_added');
            });

            return false;
        }
    }
});
