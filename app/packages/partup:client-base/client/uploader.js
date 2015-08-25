Partup.client.uploader = {

    /**
     * Upload single image
     *
     * @memberof Partup.client
     * @param {Object} file
     * @param {Function} callback
     */
    uploadImage: function(file, callback) {
        var img = document.createElement('img');
        var canvas = document.createElement('canvas');

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
            img.src = e.target.result;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = 1500;
            var MAX_HEIGHT = 1500;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            var dataUrl = canvas.toDataURL('image/jpeg', 0.8);

            Meteor.call('images.insertByDataUrl', dataUrl, function(error, dbImage) {
                if (error) return callback(error);
                Meteor.subscribe('images.one', dbImage._id);
                Meteor.autorun(function(computation) {
                    var image = Images.findOne({_id: dbImage._id});
                    if (image && image.isUploaded() && image.url()) {
                        computation.stop();
                        Tracker.nonreactive(function() {
                            callback(null, image);
                        });
                    }
                });
            });
        };
    },

    /**
     * Upload single image by url
     *
     * @memberof Partup.client
     * @param {String} url
     * @param {Function} callback
     */
    uploadImageByUrl: function(url, callback) {
        Meteor.call('images.insertByUrl', url, function(error, output) {
            if (error || !output) return callback(error);

            Meteor.subscribe('images.one', output._id, function() {
                Meteor.autorun(function(computation) {
                    var image = Images.findOne({_id: output._id});
                    if (!image) return;
                    if (!image.isUploaded()) return;
                    if (!image.url()) return;
                    computation.stop();
                    Tracker.nonreactive(function() {
                        callback(null, image);
                    });
                });
            });
        });
    }

};
