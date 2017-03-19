import {FileUploader} from 'meteor/partup-lib';


if (Meteor.isClient) {

    Template.DropboxChooser.onRendered(function () {

        /**
         * part-up webapp, Dropbox Developer console
         */

        var mediaUploader = Template.instance().data.mediaUploader;

        var $mediaTrigger = jQuery('[data-dropbox-chooser]');

        $mediaTrigger.click(mediaUploadTrigger);

        window.setData = function () {
            setTimeout(function () {
                if (!Partup.client.browser.isSafari()) {
                    mediaUploadTrigger();
                }
            }, 0);
        };

        function mediaUploadTrigger() {
            var dropboxClient;
            if (Cookies.get('dropbox-accessToken')) {
                dropboxClient = new Dropbox({accessToken: Cookies.get('dropbox-accessToken')});
                Dropbox.choose({
                    success: function (files) {
                        onFileChange.apply(Dropbox, [files, dropboxClient]);
                    },
                    linkType: "direct", // or "preview"
                    multiselect: true, // or true
                    extensions: getExtensions()
                });
            } else {
                dropboxClient = new Dropbox({clientId: jQuery('#dropboxjs').attr('data-app-key')});
                var authUrl = dropboxClient.getAuthenticationUrl(new URL(window.location).origin + "/dropbox/oauth_receiver.html");
                popupCenter(authUrl, 'dropbox', 800, 600);
            }

        }

        function popupCenter(url, title, w, h) {
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
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
                        jQuery.ajax({
                            url: 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
                            method: "POST",
                            contentType: "application/json; charset=utf-8",
                            traditional: true,
                            headers: {
                                "Authorization": "Bearer " + dropboxClient.accessToken
                            },
                            data: JSON.stringify({
                                path: '/' + decodeURI(path[2]),
                                settings: {
                                    "requested_visibility": "public",
                                    "expires": "2045-05-12T15:50:38Z"
                                }
                            }),
                        })
                            .fail(function (response) {
                                var dropboxError = response.responseJSON.error;
                                if (dropboxError['.tag'] === 'shared_link_already_exists') {
                                    mappedFile.previewLink = file.link;
                                    resolve(mappedFile);
                                } else {
                                    reject(dropboxError.error_summary);
                                }
                            })
                            .done(
                                function (result) {
                                    mappedFile.previewLink = result.url;
                                    resolve(mappedFile);
                                }
                            )

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
                var errorString = JSON.stringify(error, null, 4);
                Partup.client.notify.error(TAPi18n.__(errorString));
            });
        }
    });
}
