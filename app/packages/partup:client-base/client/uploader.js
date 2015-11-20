// Settings
//
var MAX_IMAGE_WIDTH = 1500;
var MAX_IMAGE_HEIGHT = 1500;

Partup.client.uploader = {

    /**
     * Upload single image
     *
     * @memberOf Partup.client
     * @param {Object} file
     * @param {Function} callback
     */
    uploadImage: function(file, callback) {
        var img = document.createElement('img');
        var canvas = document.createElement('canvas');
        var self = this;

        var userId = Meteor.userId();
        // TODO: Error if user is not loggedin

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
            img.src = e.target.result;
        };

        img.onload = function() {
            var width = img.naturalWidth;
            var height = img.naturalHeight;

            if (width > height) {
                if (width > MAX_IMAGE_WIDTH) {
                    height *= MAX_IMAGE_WIDTH / width;
                    width = MAX_IMAGE_WIDTH;
                }
            } else {
                if (height > MAX_IMAGE_HEIGHT) {
                    width *= MAX_IMAGE_HEIGHT / height;
                    height = MAX_IMAGE_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            var dataUrl;
            if (img.src.indexOf('image/png') > -1) {
                dataUrl = canvas.toDataURL('image/png');
            } else {
                dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            }

            var resizedFile = self.dataURLToBlob(dataUrl);

            var newFile = new File([resizedFile], file.name);

            newFile.type = resizedFile.type;

            var token = Accounts._storedLoginToken();
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Meteor.absoluteUrl() + 'images/upload?token=' + token, false);

            var formData = new FormData();
            formData.append('file', newFile);
            xhr.send(formData);

            var data = JSON.parse(xhr.responseText);

            if (data.error) {
                callback(data.error);
            }

            Meteor.subscribe('images.one', data.image);
            Meteor.autorun(function(computation) {
                var image = Images.findOne({_id: data.image});
                if (image) {
                    computation.stop();
                    Tracker.nonreactive(function() {
                        callback(null, image);
                    });
                }
            });
        };
    },

    /**
     * Return a blob from dataurl
     *
     * @memberOf Partup.client
     * @param {DataUrl} canvas dataurl
     */

    dataURLToBlob: function(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);

            return new Blob([raw], {type: contentType});
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    },

    /**
     * Loop through each file in a file input select event
     *
     * @memberOf Partup.client
     * @param {Object} fileSelectEvent
     * @param {Function} callback
     */
    eachFile: function(fileSelectEvent, callBack) {
        var e = (fileSelectEvent.originalEvent || fileSelectEvent);
        var files = e.target.files;

        if (!files || files.length === 0) {
            files = e.dataTransfer ? e.dataTransfer.files : [];
        }

        for (var i = 0; i < files.length; i++) {
            callBack(files[i]);
        }
    },

    /**
     * Upload single image by url
     *
     * @memberOf Partup.client
     * @param {String} url
     * @param {Function} callback
     */
    uploadImageByUrl: function(url, callback) {
        Meteor.call('images.insertByUrl', url, function(error, result) {
            if (error || !result) return callback(error);

            Meteor.subscribe('images.one', result._id, function() {
                Meteor.autorun(function(computation) {
                    var image = Images.findOne({_id: result._id});
                    if (image) {
                        computation.stop();
                        Tracker.nonreactive(function() {
                            callback(null, image);
                        });
                    }
                });
            });
        });
    }

};
