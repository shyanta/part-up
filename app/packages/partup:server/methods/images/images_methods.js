Meteor.methods({

    /**
     * Insert an image by url
     *
     * @param {String} url
     *
     * @return {String} imageId
     */
    'images.insertByUrl': function(url) {
        check(url, String);

        this.unblock();

        var result = HTTP.get(url, {'npmRequestOptions': {'encoding': null}});
        var buffer = new Buffer(result.content, 'binary');

        var ref = new FS.File();
        ref.attachData(buffer, {type: 'image/jpeg'});
        ref.name(Random.id() + '.jpg');

        var image = Images.insert(ref);

        return {
            _id: image._id
        };
    },

    /**
     * Insert an image by data url
     *
     * @param {String} dataUrl
     *
     * @return {String} imageId
     */
    'images.insertByDataUrl': function(dataUrl) {
        check(dataUrl, String);

        this.unblock();

        var matches = dataUrl.match(/data:(.*);(.+),(.*)/);

        if (matches && matches.length === 4) {
            var data = matches.pop();
            var encoding = matches.pop();
            var mime = matches.pop();

            var buffer = new Buffer(data, 'base64');

            var ref = new FS.File();
            ref.attachData(buffer, {type: mime});
            ref.name(Random.id() + '.jpg');

            var image = Images.insert(ref);

            return {
                _id: image._id
            };
        }
    },

});
