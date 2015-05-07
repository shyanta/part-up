Event.on('partups.image.changed', function (userId, partup, value) {
    if (! userId) return;

    var type = 'partups_image_changed';
    var typeData = {
        old_image: value.old,
        new_image: value.new
    };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, type, typeData);

    Updates.insert(update);
});
