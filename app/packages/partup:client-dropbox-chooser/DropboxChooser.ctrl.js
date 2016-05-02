if (Meteor.isClient) {

    Template.DropboxChooser.onRendered(function () {


        /**
         * part-up webapp, Dropbox Developer console
         */
        Dropbox.init({appKey: 'le3ovpnhqs4qy9g'});

        var template = Template.instance().parent();

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
            if (template.uploadedPhotos.get().length >= template.maxPhotos) {
                return Partup.helpers.allowedExtensions.docs
            }
            else if (template.uploadedDocuments.get().length >= template.maxDocuments) {
                return Partup.helpers.allowedExtensions.images
            }
            else {
                return Partup.helpers.getAllExtensions();
            }
        }

        function allowImageUpload(template, file) {
            return (Partup.helpers.fileNameIsImage(file.name)
            && template.uploadedPhotos.get().length < template.maxPhotos)
        }

        function allowDocumentUpload(template, file) {
            return (Partup.helpers.fileNameIsDoc(file.name)
            && template.uploadedDocuments.get().length < template.maxDocuments);
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

                    if (allowImageUpload(template, mappedFile)) {

                        mappedFile = _.omit(mappedFile, 'previewLink');

                        uploadPromises.push(
                            Partup.helpers.partupUploadPhoto(template, mappedFile)
                        );
                    }
                    else if (allowDocumentUpload(template, mappedFile)) {
                        mappedFile.link = mappedFile.previewLink;
                        mappedFile._id = new Meteor.Collection.ObjectID()._str;

                        mappedFile = _.omit(mappedFile, 'previewLink');

                        uploadPromises.push(
                            Partup.helpers.partupUploadDoc(template, mappedFile)
                        );
                    }
                });

                Promise.all(uploadPromises).then(function (files) {

                    files.forEach(function (file) {

                        if (allowImageUpload(template, file)) {
                            var uploaded = template.uploadedPhotos.get();
                            uploaded.push(file._id);
                            template.uploadedPhotos.set(uploaded);
                            template.uploadingPhotos.set(false);
                        }
                        else if (allowDocumentUpload(template, file)) {
                            uploaded = template.uploadedDocuments.get();
                            uploaded.push(file);
                            template.uploadedDocuments.set(uploaded);
                            template.uploadingDocuments.set(false);
                        }
                    });

                }).catch(function (error) {
                    Partup.client.notify.error(TAPi18n.__(error.reason));
                    template.uploadingPhotos.set(false);
                    template.uploadingDocuments.set(false);
                });

            }).catch(function (error) {
                Partup.client.notify.error(TAPi18n.__(error.response.error));
            });
        }
    });
}
