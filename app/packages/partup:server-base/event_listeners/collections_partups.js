Event.on('collections.partups.insert', function (data) {
    Partups.insert(data);
    console.logEventHandled(this.event, 'Partup persisted.');
});

Event.on('collections.partups.remove', function (partupId) {
    Partups.remove(partupId);
    console.logEventHandled(this.event, 'Partup ' + partupId + ' removed from persistence.');
});