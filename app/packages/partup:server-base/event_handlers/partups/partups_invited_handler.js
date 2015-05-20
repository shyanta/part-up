Event.on('partups.invited', function (userId, partupId, email, name) {
    if (! userId) return;

    var updateType = 'partups_invited';
    var updateTypeData = {
        'name': name,
        'email': email
    };

    var update = Partup.factories.updatesFactory.make(userId, partupId, updateType, updateTypeData);

    Updates.insert(update);
});
