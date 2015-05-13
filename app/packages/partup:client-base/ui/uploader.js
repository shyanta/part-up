Partup.ui.uploader = {

    /**
     * Upload single image
     *
     * @memberOf partup.ui
     * @param {Object} file
     * @param {Function} callback
     */
    uploadImage: function(file, callback) {
        Images.insert(file, function (error, dbImage) {
            if(error) return callback(error);

            Meteor.subscribe('images.one', dbImage._id);
            Meteor.autorun(function (computation) {
                var image = Images.findOne({_id: dbImage._id});
                if(image && image.isUploaded() && image.url()) {
                    callback(null, image);
                    computation.stop();
                }
            });
        });
    },

    /**
     * Upload single image by url
     *
     * @memberOf partup.ui
     * @param {String} url
     * @param {Function} callback
     */
    uploadImageByUrl: function(url, callback) {
        var dummyLink = document.createElement('a');
        dummyLink.href = url;
        var pathnameParts = dummyLink.pathname.split('/');
        var filename = pathnameParts[pathnameParts.length - 1];
        var newFile = new FS.File();
        
        newFile.attachData(url, {
            type: 'image/jpeg'
        }, function (error) {            
            newFile.name(filename);
            Partup.ui.uploader.uploadImage(newFile, function (error, image) {
                callback(error, image);
            });
        });
    }

};