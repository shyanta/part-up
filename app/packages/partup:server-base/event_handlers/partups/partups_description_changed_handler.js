Event.on('partups.description.changed', function (userId, partup, value) {
    if (! userId) return;

    var type = 'partups_description_changed';
    var typeData = {
        old_description: value.old,
        new_description: value.new
    };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, type, typeData);

    Updates.insert(update);
});
