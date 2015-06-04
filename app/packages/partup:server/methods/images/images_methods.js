Meteor.methods({

    /**
     * Insert an image by url
     *
     * @param {String} url
     *
     * @return {String} imageId
     */
    'images.insertByUrl': function(url) {
        var result = HTTP.get(url, {'npmRequestOptions': {'encoding': null}});
        var buffer = new Buffer(result.content, 'binary');

        var ref = new FS.File();
        ref.attachData(buffer, {type: 'image/jpeg'});
        ref.name(Random.id() + '.jpg');

        var image = Images.insert(ref);

        return {
            _id: image._id
        };
    }

});
