Event.on('partups.inserted', function(userId, partup) {
    if (!userId) return;

    // Store new tags into collection
    Partup.services.tags.insertNewTags(partup.tags);

    var update = Partup.factories.updatesFactory.make(userId, partup._id, 'partups_created', {});

    Updates.insert(update);
});

Event.on('partups.updated', function(userId, partup, fields) {
    // Store new tags into collection
    Partup.services.tags.insertNewTags(partup.tags);
});
