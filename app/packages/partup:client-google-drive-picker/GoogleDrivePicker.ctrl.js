if (Meteor.isClient) {

    // The Browser API key obtained from the Google Developers Console.
    var developerKey = 'AIzaSyCOkQptZG9lk74yJ8p5p-1e5AawvWERnvI';

    // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
    var clientId = "625218626012-tepgtc2r68tusb5hnkm0nja8ism9tj4p.apps.googleusercontent.com";

    // Scope to use to access user's drive.
    var scope = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];

    var oauthToken;

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
                    reject(resp);
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
                window.gapi.load(api, {'callback': () => resolve(api)});
            });
        })).then(function () {
            window.gapi.client.load('drive', 'v3', function () {
                $mediaTrigger.off('click', authorize);
                $mediaTrigger.on('click', authorize);
            });
        });


        function authorize() {
            window.gapi.auth.authorize({
                'client_id': clientId,
                'scope': scope,
                'immediate': false
            }, handleAuthResult);
        }

        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                oauthToken = authResult.access_token;
            }
            createPicker();

            function createPicker() {
                if (oauthToken) {
                    var picker = new google.picker
                        .PickerBuilder()
                        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                        .addView(google.picker.ViewId.DOCS)
                        .addView(new google.picker.DocsUploadView())

                        .setOAuthToken(oauthToken)
                        .setCallback(pickerCallback)
                        .build();
                    picker.setVisible(true);
                }
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

        function pickerCallback(data) {

            $('[data-toggle-add-media-menu]').trigger('click');

            var uploadPromises = [];
            var settingPromises = [];

            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                data.docs.forEach(function (file) {

                    settingPromises.push(GoogleDrivePicker.setDefaultPermission(file));

                    var mappedFile = file;
                    mappedFile.icon = mappedFile.iconUrl.toString();
                    mappedFile.bytes = parseInt(mappedFile.sizeBytes);
                    mappedFile.link = mappedFile.url.toString();
                    mappedFile.name = mappedFile.name.toString();
                    mappedFile.mimeType = mappedFile.mimeType.toString();

                    mappedFile = _.pick(mappedFile, 'icon', 'bytes', 'link', 'name', 'mimeType');

                    if (allowImageUpload(template, mappedFile)) {
                        uploadPromises.push(
                            Partup.helpers.partupUploadPhoto(template, mappedFile)
                        );
                    }
                    else if (allowDocumentUpload(template, mappedFile)) {
                        mappedFile._id = new Meteor.Collection.ObjectID()._str;

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
                });

                Promise.all(settingPromises).catch(function (resp) {
                    Partup.client.notify.error(TAPi18n.__(resp.error.message));
                });
            }
        }
    });
}
