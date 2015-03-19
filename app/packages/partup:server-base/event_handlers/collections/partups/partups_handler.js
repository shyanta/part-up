Event.on('collections.partups.inserted', function (partup) {
    console.log('Partup [' + partup._id + '] inserted.');
});

Event.on('collections.partups.updated', function (partup, fields) {
    console.log('Partup [' + partup._id + '] updated.');
});

Event.on('collections.partups.removed', function (partup) {
    console.log('Partup [' + partup._id + '] removed.');
});

Event.on('collections.partups.*.updated', function (partup, value) {
   console.log('Partup [' + partup._id + '] had it\'s value for \'' + value.name + '\' change from ' + value.old + ' to ' + value.new);
});
