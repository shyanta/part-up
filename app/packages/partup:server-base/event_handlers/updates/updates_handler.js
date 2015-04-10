Event.on('partups.updates.inserted', function (userId, update) {
    Log.debug('Update [' + update._id + '] with Partup [' + update.partup_id + '] inserted.');
});

Event.on('partups.updates.updated', function (userId, update, fields) {
    Log.debug('Update [' + update._id + '] with Partup [' + update.partup_id + '] updated.');
});

Event.on('partups.updates.removed', function (userId, update) {
    Log.debug('Update [' + update._id + '] with Partup [' + update.partup_id + '] removed.');
});
