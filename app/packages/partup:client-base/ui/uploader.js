Partup.ui.uploader = {

    /**
     * Upload single image
     *
     * @memberOf partup.ui
     * @param {Object} file
     * @param {Function} callback
     */
    uploadImage: function(file, callback) {
        Images.insert(file, function (error, image) {
            callback(error, image);
            if(!error) Meteor.subscribe('images.one', image._id);
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
        var newFile = new FS.File();
        newFile.attachData(url, function (error) {
            var dummyLink = document.createElement('a');
            dummyLink.href = url;
            var pathnameParts = dummyLink.pathname.split('/');
            var filename = pathnameParts[pathnameParts.length - 1];
            newFile.name(filename);

            Partup.ui.uploader.uploadImage(newFile, function (error, image) {
                callback(error, image);
            });
        });
    }

};