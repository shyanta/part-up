Meteor.methods({

    /**
     * Insert an image by url
     *
     * @param {String} url
     *
     * @return {String} imageId
     */
    'images.insertByUrl': function (url) {
        var fileRef = new FS.File();
        fileRef.attachData(url, { type: 'image/jpeg' });

        var image = Images.insert(fileRef);

        return {
            _id: image._id
        };
    }

});
