Event.on('collections.partups.insert', function (data) {
    Partups.insert(data);

    console.log('User saved!');
});