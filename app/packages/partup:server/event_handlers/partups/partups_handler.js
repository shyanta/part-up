Event.on('partups.inserted', function(userId, partup) {
    Log.debug('Partup [' + partup._id + '] inserted.');

    if (!userId) return;

    var update = Partup.factories.updatesFactory.make(userId, partup._id, 'partups_created', {});

    Updates.insert(update);
});

Event.on('partups.updated', function(userId, partup, fields) {
    Log.debug('Partup [' + partup._id + '] updated.');
});

Event.on('partups.removed', function(userId, partup) {
    Log.debug('Partup [' + partup._id + '] removed.');
});
