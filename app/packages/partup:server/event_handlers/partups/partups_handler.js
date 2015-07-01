Event.on('partups.inserted', function(userId, partup) {
    Log.debug('Partup [' + partup._id + '] inserted.');

    if (!userId) return;

    // Store new tags into collection
    Partup.services.tags.insertNewTags(partup.tags);

    var update = Partup.factories.updatesFactory.make(userId, partup._id, 'partups_created', {});

    Updates.insert(update);
});

Event.on('partups.updated', function(userId, partup, fields) {
    Log.debug('Partup [' + partup._id + '] updated.');

    // Store new tags into collection
    Partup.services.tags.insertNewTags(partup.tags);
});

Event.on('partups.removed', function(userId, partup) {
    Log.debug('Partup [' + partup._id + '] removed.');
});
