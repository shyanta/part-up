Event.on('partups.updated', function (userId, partup, oldPartup) {
    if (! userId) return;

    // Nothing changed
    if (partup.budget_type === oldPartup.budget_type && partup.budget_amount === oldPartup.budget_amount) return;

    var updateType = 'partups_budget_changed';
    var updateTypeData = {
        old_value: oldPartup.budget_amount,
        old_type: oldPartup.budget_type,
        new_value: partup.budget_amount,
        new_type: partup.budget_type
    };

    var update = Partup.factories.updatesFactory.make(userId, partup._id, updateType, updateTypeData);

    Updates.insert(update);
});
