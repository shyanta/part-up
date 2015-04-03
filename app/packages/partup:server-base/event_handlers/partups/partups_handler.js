Event.on('partups.inserted', function (partup) {
    Log.debug('Partup [' + partup._id + '] inserted.');
});

Event.on('partups.updated', function (partup, fields) {
    Log.debug('Partup [' + partup._id + '] updated.');
});

Event.on('partups.removed', function (partup) {
    Log.debug('Partup [' + partup._id + '] removed.');
});

Event.on('partups.*.updated', function (partup, value) {
   Log.debug('Partup [' + partup._id + '] had it\'s value for [' + value.name + '] change from [' + value.old + '] to [' + value.new + ']');
});
