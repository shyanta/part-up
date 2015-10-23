/**
 * Insert the default profile pictures into the database
 */
Meteor.startup(function() {

    for (var i = 1; i <= 15; i++) {
        var exists = !!Images.findOne({'meta.default_profile_picture': true, 'meta.default_profile_picture_index': i});

        if (!exists) {
            var filename = 'Profielfoto' + i + '.png';
            var body = new Buffer(Assets.getBinary('private/default_profile_pictures/' + filename));
            var meta = {default_profile_picture: true, default_profile_picture_index: i};

            Partup.server.services.images.upload(filename, body, 'image/png', {meta: meta});
        }
    }

});
