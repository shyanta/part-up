Event.on('partups.name.changed', function (userId, partup, value) {
    if (! userId) return;

    var type = 'partups_name_changed';
    var typeData = {
        old_name: value.old,
        new_name: value.new
    };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, type, typeData);

    Updates.insert(update);
});
