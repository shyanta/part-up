/**
 * Insert the default profile pictures into the database
 */
Meteor.startup(function() {

    for (var i = 1; i <= 12; i++) {
        var exists = !!Images.findOne({'meta.default_partup_picture': true, 'meta.default_partup_picture_index': i});

        if (!exists) {
            var name = 'Partupfoto' + i + '.png';
            var image = Assets.getBinary('private/default_partup_pictures/' + name);
            var file = new FS.File();

            file.name(name);
            file.attachData(image, {type: 'image/png'});
            file.meta = {default_partup_picture: true, default_partup_picture_index: i};

            Images.insert(file);
        }
    }

});
