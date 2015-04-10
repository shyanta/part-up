Event.on('partups.description.changed', function (userId, partup, value) {
    if (! userId) return;

    var update = {
        partup_id: partup._id,
        upper_id: userId,
        type: 'partups_description_changed',
        type_data: {
            old_description: value.old,
            new_description: value.new
        },
        created_at: new Date()
    };

    Updates.insert(update);
});
