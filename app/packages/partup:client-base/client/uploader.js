Partup.client.uploader = {

    /**
     * Upload single image
     *
     * @memberof Partup.client
     * @param {Object} file
     * @param {Function} callback
     */
    uploadImage: function(file, callback) {
        Images.insert(file, function(error, dbImage) {
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
