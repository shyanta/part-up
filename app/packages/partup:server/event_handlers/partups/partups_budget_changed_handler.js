Event.on('partups.updated', function(userId, partup, oldPartup) {
    if (!userId) return;

    // Return if nothing changed
    if (partup.type === oldPartup.type &&
        partup['type_' + partup.type + '_budget'] == oldPartup['type_' + oldPartup.type + '_budget'])
        return;

    var updateType = 'partups_budget_changed';
    var updateTypeData = {
        old_type: oldPartup.type,
        old_value: oldPartup['type_' + oldPartup.type + '_budget'],
        new_type: partup.type,
        new_value: partup['type_' + partup.type + '_budget']
    };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, updateType, updateTypeData);

    Updates.insert(update);
});
