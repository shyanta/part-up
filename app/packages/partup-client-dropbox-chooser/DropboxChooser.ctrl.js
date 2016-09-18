import {FileUploader} from 'meteor/partup-lib';

if (Meteor.isClient) {

    Template.DropboxChooser.onRendered(function () {


        /**
         * part-up webapp, Dropbox Developer console
         */
        Dropbox.init({appKey: 'le3ovpnhqs4qy9g'});

        var mediaUploader = Template.instance().data.mediaUploader;

        var $mediaTrigger = jQuery('[data-dropbox-chooser]');

        $mediaTrigger.click(mediaUploadTrigger);

        function mediaUploadTrigger() {

            // Browser-side applications do not use the API secret.
            var client = new Dropbox.Client({key: "le3ovpnhqs4qy9g"});

            client.authDriver(
                new Dropbox.AuthDriver.Popup({
                    receiverUrl: new URL(window.location).origin + "/dropbox/oauth_receiver.html"
                }));

            client.authenticate(function (error, dropboxClient) {
                if (error) {
                    return Partup.client.notify.error(TAPi18n.__(error.response.error));
                }

                Dropbox.choose({
                    success: function (files) {
                        onFileChange.apply(Dropbox, [files, dropboxClient]);
                    },
                    linkType: "direct", // or "preview"
                    multiselect: true, // or true
                    extensions: getExtensions()
                });
            });


        }

        function getExtensions() {
            if (mediaUploader.uploadedPhotos.get().length >= mediaUploader.maxPhotos) {
                return FileUploader.allowedExtensions.docs
            }
            else if (mediaUploader.uploadedDocuments.get().length >= mediaUploader.maxDocuments) {
                return FileUploader.allowedExtensions.images
            }
            else {
                return FileUploader.getAllExtensions();
            }
        }

        function allowImageUpload(mediaUploader, file) {
            return (FileUploader.fileNameIsImage(file.name)
            && mediaUploader.uploadedPhotos.get().length < mediaUploader.maxPhotos)
        }

        function allowDocumentUpload(mediaUploader, file) {
            return (FileUploader.fileNameIsDoc(file.name)
            && mediaUploader.uploadedDocuments.get().length < mediaUploader.maxDocuments);
        }

        function onFileChange(files, dropboxClient) {
            var uploadPromises = [];
            var shareSettingPromises = [];

            files.forEach(function (file) {
                var mappedFile = file;

                var path = file.link.match(/(\/view\/\w+\/)(.*)/);

                if (path) {
                    shareSettingPromises.push(new Promise(function (resolve, reject) {
                        dropboxClient.makeUrl(decodeURI(path[2]), {
                            longUrl: true,
                            long: true
                        }, function (error, result) {
                            if (error) {
                                reject(error);
                            }
                            mappedFile.previewLink = result.url;
                            resolve(mappedFile);
                        })
                    }));
                }
            });


            Promise.all(shareSettingPromises).then(function (files) {
                files.forEach(function (file) {
                    var mappedFile = file;

                    if (allowImageUpload(mediaUploader, mappedFile)) {

                        mappedFile = _.omit(mappedFile, 'previewLink');

                        uploadPromises.push(
                            FileUploader.partupUploadPhoto(mediaUploader, mappedFile)
                        );
                    }
                    else if (allowDocumentUpload(mediaUploader, mappedFile)) {
                        mappedFile.link = mappedFile.previewLink;
                        mappedFile._id = new Meteor.Collection.ObjectID()._str;

                        mappedFile = _.omit(mappedFile, 'previewLink');

                        uploadPromises.push(
                            FileUploader.partupUploadDoc(mediaUploader, mappedFile)
                        );
                    }
                });

                Promise.all(uploadPromises).then(function (files) {

                    files.forEach(function (file) {

                        if (allowImageUpload(mediaUploader, file)) {
                            var uploaded = mediaUploader.uploadedPhotos.get();
                            uploaded.push(file._id);
                            mediaUploader.uploadedPhotos.set(uploaded);
                            mediaUploader.uploadingPhotos.set(false);
                        }
                        else if (allowDocumentUpload(mediaUploader, file)) {
                            uploaded = mediaUploader.uploadedDocuments.get();
                            uploaded.push(file);
                            mediaUploader.uploadedDocuments.set(uploaded);
                            mediaUploader.uploadingDocuments.set(false);
                        }
                    });

                }).catch(function (error) {
                    Partup.client.notify.error(TAPi18n.__(error.reason));
                    mediaUploader.uploadingPhotos.set(false);
                    mediaUploader.uploadingDocuments.set(false);
                });

            }).catch(function (error) {
                Partup.client.notify.error(TAPi18n.__(error.response.error));
            });
        }
    });
}
