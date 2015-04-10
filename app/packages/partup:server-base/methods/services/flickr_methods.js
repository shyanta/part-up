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
    'partups.images.tags.search': function (tags, count, fallbackTags) {

        var lookupTags = Meteor.wrapAsync(function (tags, count, callback) {

            var searchByTags = function (tags, count, photos) {

                var searchableTags = tags.join(',');
                flickr.get('photos.search', {
                    'tags': searchableTags,
                    'tag_mode': 'all',
                    'media': 'photos',
                    'sort': 'interestingness-desc',
                    'license': 4, // Attribution License
                    'content_type': 1 // Photos only
                }, function (result) {
                    result.photos.photo.forEach(function (photo) {
                        photos.push({
                            'imageUrl': 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg',
                            'authorUrl': 'https://www.flickr.com/photos/' + photo.owner
                        });
                    });

                    if (photos.length < count) {
                        tags.pop();

                        if (tags.length == 0) {
                            // Fallback to provided default tags
                            return searchByTags(fallbackTags, count, photos);
                        }

                        return searchByTags(tags, count, photos);
                    }

                    return callback(null, photos.slice(0, count));
                });
            };

            searchByTags(tags, count, []);
        });

        return lookupTags(tags, count);
    }

});