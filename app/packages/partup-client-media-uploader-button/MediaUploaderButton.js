import {Template} from 'meteor/templating';
import {FileUploader} from 'meteor/partup-lib';

function photoLimitReached() {

    let mediaUploader = Template.instance().data.mediaUploader;

    return mediaUploader.uploadedPhotos.get().length
        === mediaUploader.maxPhotos;
}

function mediaLimitReached() {

    let mediaUploader = Template.instance().data.mediaUploader;

    var mediaItems = mediaUploader.uploadedPhotos.get().length +
        mediaUploader.uploadedDocuments.get().length;

    return mediaItems === mediaUploader.maxMediaItems;
}

function toggleMenu($toggleContainer) {
    var $button = $toggleContainer.find('.pu-sub-container button');
    var $ul = $toggleContainer.find('ul.pu-dropdown');
    var $icon = $button.find('i');

    var openMenu = function () {
        $toggleContainer.addClass('pu-formdropdown-active');
        $ul.addClass('pu-dropdown-active');
        $icon.removeClass('picon-caret-down');
        $icon.addClass('picon-caret-up');
    };

    var closeMenu = function () {
        $toggleContainer.removeClass('pu-formdropdown-active');
        $ul.removeClass('pu-dropdown-active');
        $icon.addClass('picon-caret-down');
        $icon.removeClass('picon-caret-up');
    };

    if ($icon.hasClass('picon-caret-down')) {
        openMenu();
        $(document).one('click', closeMenu);
    } else {
        closeMenu();
    }
}

Template.MediaUploaderButton.events({
    'click [data-toggle-add-media-menu]': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        if (!mediaLimitReached()) {
            toggleMenu($(event.currentTarget));
        }
    }
});

Template.MediaUploaderButton.helpers({
    mediaLimitReached: mediaLimitReached,
    imageExtensions: function () {
        return FileUploader.imageExtensions.join(', ');
    },
    uploadingMedia: function () {
        let mediaUploader = Template.instance().data.mediaUploader;

        var uploading = [
            mediaUploader.uploadingPhotos.get(),
            mediaUploader.uploadingDocuments.get()
        ];

        uploading = _.countBy(uploading, function (value) {
            return (value) ? 'isActive' : 'notActive';
        });

        return uploading.isActive > 0;
    },
    photoLimitReached: photoLimitReached,
    documentLimitReached: function () {
        let mediaUploader = Template.instance().data.mediaUploader;

        return mediaUploader.uplodedDocuments.get().length
            === mediaUploader.maxDocuments;
    },
    disabledImageUploadFile: function () {
        return (photoLimitReached()) ? 'disabled' : '';
    },
    mediaUploader: function() {
        return Template.instance().data.mediaUploader;
    },
    imageInput: function () {
        let mediaUploader = Template.instance().data.mediaUploader;
        return {
            button: 'data-browse-photos',
            input: 'data-photo-input',
            multiple: true,
            onFileChange: function (event) {

                mediaUploader.uploadingPhotos.set(true);

                // simulate click event to toggle "open/close" the media choose dropdown
                $('[data-toggle-add-media-menu]').trigger('click');

                var total = Math.max(mediaUploader.totalPhotos.get(), mediaUploader.uploadedPhotos.get().length);
                Partup.client.uploader.eachFile(event, function (file) {
                    if (total === mediaUploader.maxPhotos) return;

                    Partup.client.uploader.uploadImage(file, function (error, image) {
                        mediaUploader.uploadingPhotos.set(false);
                        if (error) {
                            Partup.client.notify.error(TAPi18n.__(error.reason));
                            return;
                        }
                        var uploaded = mediaUploader.uploadedPhotos.get();
                        uploaded.push(image._id);
                        mediaUploader.uploadedPhotos.set(uploaded);
                    });
                    total++;
                    mediaUploader.totalPhotos.set(total);
                });
            }
        };
    }
});
