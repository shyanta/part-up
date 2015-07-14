Event.on('partups.inserted', function(userId, partup) {
    if (!userId) return;

    // Store new tags into collection
    Partup.services.tags.insertNewTags(partup.tags);

    // "User created this part-up" update
    var update_created = Partup.factories.updatesFactory.make(userId, partup._id, 'partups_created', {});
    Updates.insert(update_created);

    // "System message" update
    var update_systemmessage = Partup.factories.updatesFactory.makeSystem(partup._id, 'partups_message_added', {
        type: 'welcome_message'
    });
    Updates.insert(update_systemmessage);
});

Event.on('partups.updated', function(userId, partup, fields) {

    // Store new tags into collection
    Partup.services.tags.insertNewTags(partup.tags);

});
