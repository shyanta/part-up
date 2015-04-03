Event.on('partups.inserted', function (partup) {
    Log.debug('Partup [' + partup._id + '] inserted.');
});

Event.on('partups.updated', function (partup, fields) {
    Log.debug('Partup [' + partup._id + '] updated.');
});

Event.on('partups.removed', function (partup) {
    Log.debug('Partup [' + partup._id + '] removed.');
});