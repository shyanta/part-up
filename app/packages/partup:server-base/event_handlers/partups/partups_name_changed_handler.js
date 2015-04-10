Event.on('partups.name.changed', function (userId, partup, value) {
    if (! userId) return;

    var update = {
        partup_id: partup._id,
        upper_id: userId,
        type: 'partups_name_changed',
        type_data: {
            old_name: value.old,
            new_name: value.new
        },
        created_at: new Date()
    };

    Updates.insert(update);
});
