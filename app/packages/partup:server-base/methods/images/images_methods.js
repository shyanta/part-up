Meteor.methods({

    /**
     * Insert an image by url
     *
     * @param {String} url
     *
     * @return {String} imageId
     */
    'images.insertByUrl': function (url) {
        var result = HTTP.get(url, { 'npmRequestOptions': { 'encoding': null } });
        var buffer = new Buffer(result.content, 'binary');

        var ref = new FS.File();
        ref.attachData(buffer, { type: 'image/jpeg' });
        ref.name(Random.id() + '.jpg');

        var image = Images.insert(ref);

        return {
            _id: image._id
        };
    },

    /**
     * Set the focus point of a partup cover image
     *
     * @param {String} partupId
     * @param {String} imageId
     * @param {String} focusX
     * @param {String} focusY
     *
     * @return {Boolean}
     */
    'images.partups.setFocusPoint': function (partupId, imageId, focusX, focusY) {
        var partup = Partups.findOneOrFail(partupId);
        var image = Images.findOneOrFail(imageId);

        var floatFocusX = parseFloat(focusX);
        var floatFocusY = parseFloat(focusY);

        if (isNaN(floatFocusX) || isNaN(floatFocusY)) {
            throw new Meteor.Error('Focuspoint x and y values are invalid.');
        }

        floatFocusX = Math.max(0, Math.min(floatFocusX, 1));
        floatFocusY = Math.max(0, Math.min(floatFocusY, 1));

        // TODO: Save the image
    },

});
