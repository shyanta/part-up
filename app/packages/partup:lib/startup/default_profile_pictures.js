/**
 * Insert the default profile pictures into the database
 */
Meteor.startup(function() {

    for (var i = 1; i <= 15; i++) {
        var exists = !!Images.findOne({'meta.default_profile_picture': true, 'meta.default_profile_picture_index': i});

        if (!exists) {
            var name = 'Profielfoto' + i + '.png';
            var image = Assets.getBinary('private/default_profile_pictures/' + name);
            var file = new FS.File();

            file.name(name);
            file.attachData(image, {type: 'image/png'});
            file.meta = {default_profile_picture: true, default_profile_picture_index: i};

            Images.insert(file);
        }
    }

});
