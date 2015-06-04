Event.on('partups.updated', function(userId, partup, oldPartup) {
    if (!userId) return;

    // Return if nothing changed
    if (partup.budget_type === oldPartup.budget_type &&
        partup['budget_' + partup.budget_type] === oldPartup['budget_' + oldPartup.budget_type])
        return;

    var updateType = 'partups_budget_changed';
    var updateTypeData = {
        old_type: oldPartup.budget_type,
        old_value: oldPartup['budget_' + oldPartup.budget_type],
        new_type: partup.budget_type,
        new_value: partup['budget_' + partup.budget_type]
    };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, updateType, updateTypeData);

    Updates.insert(update);
});
