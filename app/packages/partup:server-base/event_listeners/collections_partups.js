Event.on('collections.partups.insert', function (data) {
    Partups.insert(data);
    console.log('Partup saved.');
});

Event.on('collections.partups.remove', function (partupId) {
    Partups.remove(partupId);
    console.log('Partup ' + partupId + ' removed.');
});