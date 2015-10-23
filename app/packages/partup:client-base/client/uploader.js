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

            var token = Accounts._storedLoginToken();
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Meteor.absoluteUrl() + 'images/upload?token=' + token, false);

            var formData = new FormData();
            formData.append('file', file);
            xhr.send(formData);

            var data = JSON.parse(xhr.responseText);

            if (data.error) {
                // TODO: Error handling
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
