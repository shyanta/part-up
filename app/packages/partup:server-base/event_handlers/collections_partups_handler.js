Event.on('collections.partups.insert', function (fields) {
    Partups.insert(fields);

    console.log('Partup persisted.');
});

Event.on('collections.partups.update', function (partupId, fields) {
   Partups.update(partupId, { $set: fields });
});

Event.on('collections.partups.remove', function (partupId) {
    Partups.remove(partupId, function (error) {
        if (error) console.error(error);

        console.log('Partup ' + partupId + ' removed from persistence.');
    });
});

Event.on('collections.partups.*.update', function (partupId, value) {
   console.log('Partup ' + partupId + ' had it\'s value for \'' + value.name + '\' change from ' + value.old + ' to ' + value.new);
});