import {FileUploader} from 'meteor/partup:lib';

if (Meteor.isClient) {

    // The Browser API key obtained from the Google Developers Console.
    var developerKey = 'AIzaSyAN_WmzOOIcrkLCobAyUqTTQPRtAaD8lkM';

    // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
    var clientId = "963161275015-ktpmjsjtr570htbmbkuepthb1st8o99o.apps.googleusercontent.com";

    // Scope to use to access user's drive.
    var scope = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

    var accessToken;

    GoogleDrivePicker = GoogleDrivePicker || {};

    GoogleDrivePicker.setDefaultPermission = function (file) {
        var request = window.gapi.client.drive.permissions.create({
            fileId: file.id,
            sendNotificationEmail: false,
            transferOwnership: false,
            role: 'reader',
            type: 'anyone'
        });

        return new Promise(function (resolve, reject) {
            request.execute(function (resp) {
                if (resp.error) {
                    reject(resp.error);
                } else {
                    resolve(resp);
                }
            });
        });
    };

    Template.GoogleDrivePicker.onRendered(function () {

        var template = Template.instance().parent();

        var $mediaTrigger = jQuery('[data-google-drive-picker]');

        Promise.all([
            'auth',
            'picker',
            'client'
        ].map(function (api) {
            return new Promise(function (resolve) {
                window.gapi.load(api, {
                    'callback': function () {
                        resolve(api)
                    }
                });
            });
        })).then(function () {
            window.gapi.client.load('drive', 'v3', function () {
                $mediaTrigger.off('click', authorize);
                $mediaTrigger.on('click', authorize);
            });
        });


        function authorize() {
            var token = window.gapi.auth.getToken();
            if (!token) {
                window.gapi.auth.authorize({
                    'client_id': clientId,
                    'scope': scope,
                    'immediate': false
                }, handleAuthResult);
            } else {
                createPicker(token.access_token);
            }
        }

        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                accessToken = authResult.access_token;
            }
            createPicker(accessToken);
        }

        function createPicker(accessToken) {
            if (accessToken) {

                var docsView = new google.picker.DocsView();
                docsView.setIncludeFolders(true);

                var pickerBuilder = new google.picker
                    .PickerBuilder();

                pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
                pickerBuilder.addView(docsView);
                pickerBuilder.addView(new google.picker.DocsUploadView());
                // pickerBuilder.setDeveloperKey(developerKey);
                pickerBuilder.setOAuthToken(accessToken);
                pickerBuilder.setCallback(pickerCallback);

                /**
                 * Set the preferred dialog size. The dialog will be auto-centered.
                 * It has a minimum size of (566,350) and a maximum size of (1051,650).
                 */
                pickerBuilder.setSize(jQuery(document).outerWidth(), jQuery(document).outerHeight());

                var picker = pickerBuilder.build();
                picker.setVisible(true);
            }
        }

        function allowImageUpload(template, file) {
            return (FileUploader.fileNameIsImage(file.name)
            && template.uploadedPhotos.get().length < template.maxPhotos)
        }

        function allowDocumentUpload(template, file) {
            return (FileUploader.fileNameIsDoc(file.name)
            && template.uploadedDocuments.get().length < template.maxDocuments);
        }

        function pickerCallback(data) {

            setTimeout(function () {
                $('[data-toggle-add-media-menu]').trigger('click');
            }, 100);

            var uploadPromises = [];
            var settingPromises = [];

            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {

                data.docs.forEach(function (file) {
                    settingPromises.push(GoogleDrivePicker.setDefaultPermission(file));
                });

                Promise.all(settingPromises)
                    .then(function () {
                        data.docs.forEach(function (file) {
                            var mappedFile = file;
                            mappedFile.icon = file.iconUrl.toString();
                            mappedFile.bytes = (!isNaN(file.sizeBytes)) ? parseInt(file.sizeBytes) : 0;
                            mappedFile.name = file.name.toString();
                            mappedFile.mimeType = file.mimeType.toString();

                            if (allowImageUpload(template, mappedFile)) {
                                mappedFile.link = 'https://docs.google.com/uc?id=' + file.id;
                                mappedFile = _.pick(mappedFile, 'icon', 'bytes', 'link', 'name', 'mimeType');
                                uploadPromises.push(
                                    FileUploader.partupUploadPhoto(template, mappedFile)
                                );
                            }
                            else if (allowDocumentUpload(template, mappedFile)) {
                                mappedFile.link = file.url.toString();
                                mappedFile = _.pick(mappedFile, 'icon', 'bytes', 'link', 'name', 'mimeType');
                                mappedFile._id = new Meteor.Collection.ObjectID()._str;
                                uploadPromises.push(
                                    FileUploader.partupUploadDoc(template, mappedFile)
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
                    })
                    .catch(function (error) {
                        Partup.client.notify.error(TAPi18n.__(error.message));
                        template.uploadingPhotos.set(false);
                        template.uploadingDocuments.set(false);
                    });
            }
        }
    });
}
