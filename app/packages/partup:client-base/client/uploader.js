Partup.client.uploader = {

    /**
     * Upload single image
     *
     * @memberOf Partup.client
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
                    callback(null, image);
                    computation.stop();
                }
            });
        });
    },

    /**
     * Upload single image by url
     *
     * @memberOf Partup.client
     * @param {String} url
     * @param {Function} callback
     */
    uploadImageByUrl: function(url, callback) {
        Meteor.call('images.insertByUrl', url, function(error, output) {
            if (error || !output) return callback(error);

            Meteor.subscribe('images.one', output._id);
            Meteor.autorun(function(computation) {
                var image = Images.findOne({_id: output._id});
                if (image && image.isUploaded() && image.url()) {
                    callback(null, image);
                    computation.stop();
                }
            });
        });
    }

};
