/**
 * Insert the default profile pictures into the database
 */
Meteor.startup(function() {

    for (var i = 1; i <= 12; i++) {
        var exists = !!Images.findOne({'meta.default_partup_picture': true, 'meta.default_partup_picture_index': i});

        if (!exists) {
            var filename = 'Partupfoto' + i + '.png';
            var body = new Buffer(Assets.getBinary('private/default_partup_pictures/' + filename));
            var meta = {default_partup_picture: true, default_partup_picture_index: i};

            Partup.server.services.images.upload(filename, body, 'image/png', {meta: meta});
        }
    }

});
