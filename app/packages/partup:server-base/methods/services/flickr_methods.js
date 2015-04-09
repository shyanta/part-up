var Flickr = Npm.require('node-flickr');
var keys = {
    'api_key': process.env.FLICKR_API_KEY,
    'secret': process.env.FLICKR_SECRET_KsEY
};

flickr = new Flickr(keys);

Meteor.methods({

    /**
     * Return Flickr images based on tag relevancy
     *
     * @param {string[]} tags
     * @param {number} count Number of results to return
     */
    'partups.images.tags.search': function (tags, count) {

        var searchByTags = function (tags, count, photos, callback) {
            var searchableTags = tags.join(',');

            flickr.get('photos.search', {
                'tags': searchableTags,
                'tag_mode': 'all',
                'media': 'photos'
            }, function (result) {
                result.photos.photo.forEach(function (photo) {
                    photos.push({
                        'imageUrl': 'https://farm' +photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                    });
                });

                if (photos.length < count) {
                    tags.pop();
                    return searchByTags(tags, count, photos, callback);
                }

                return callback(photos.slice(0, count));
            });
        };

        var resultPhotos = searchByTags(tags, count, [], function (photos) {
            console.log(photos);
            return photos;
        });

    }

});