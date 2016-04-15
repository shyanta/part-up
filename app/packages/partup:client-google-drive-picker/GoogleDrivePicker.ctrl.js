if (Meteor.isClient) {

    // The Browser API key obtained from the Google Developers Console.
    var developerKey = 'AIzaSyCOkQptZG9lk74yJ8p5p-1e5AawvWERnvI';

    // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
    var clientId = "625218626012-tepgtc2r68tusb5hnkm0nja8ism9tj4p.apps.googleusercontent.com";

    // Scope to use to access user's photos.
    var scope = ['https://www.googleapis.com/auth/drive'];

    var pickerApiLoaded = false;
    var oauthToken;



    Template.GoogleDrivePicker.onRendered(function () {

        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker', {'callback': onPickerApiLoad});

        var template = Template.instance().parent();

        var $mediaTrigger = jQuery('[data-google-drive-picker]');

        function onAuthApiLoad() {
            $mediaTrigger.off('click', authorize);
            $mediaTrigger.on('click', authorize);
        }

        function authorize() {
            window.gapi.auth.authorize(
                {
                    'client_id': clientId,
                    'scope': scope,
                    'immediate': false
                },
                handleAuthResult);
        }

        function onPickerApiLoad() {
            pickerApiLoaded = true;
        }

        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                oauthToken = authResult.access_token;
            }
            createPicker();
        }

        function createPicker() {
            if (pickerApiLoaded && oauthToken) {
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

            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                data.docs.forEach(function (file) {
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
            }
        }
    });
}
