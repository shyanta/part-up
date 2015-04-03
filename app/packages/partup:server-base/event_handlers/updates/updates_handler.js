Event.on('partups.updates.inserted', function (update) {
    Log.debug('Update [' + update._id + '] with Partup [' + update.partup_id + '] inserted.');
});

Event.on('partups.updates.updated', function (update, fields) {
    Log.debug('Update [' + update._id + '] with Partup [' + update.partup_id + '] updated.');
});

Event.on('partups.updates.removed', function (update) {
    Log.debug('Update [' + update._id + '] with Partup [' + update.partup_id + '] removed.');
});
