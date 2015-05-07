Event.on('partups.image.changed', function (userId, partup, value) {
    if (! userId) return;

    var update = {
        partup_id: partup._id,
        upper_id: userId,
        type: 'partups_image_changed',
        type_data: {
            old_image: value.old,
            new_image: value.new
        },
        created_at: new Date(),
        updated_at: new Date()
    };

    Updates.insert(update);
});
