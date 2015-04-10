Event.on('partups.end_date.changed', function (userId, partup, value) {
    if (! userId) return;

    var update = {
        partup_id: partup._id,
        upper_id: userId,
        type: 'partups_end_date_changed',
        type_data: {
            old_end_date: value.old,
            new_end_date: value.new
        },
        created_at: new Date()
    };

    Updates.insert(update);
});
