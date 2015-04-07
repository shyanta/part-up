Event.on('partups.image.changed', function (partup, value) {
    var upper = Meteor.user();
    if (! upper) return;

    var update = {
        partup_id: partup._id,
        upper_id: upper._id,
        type: 'partups_image_changed',
        type_data: {
            old_image: value.old,
            new_image: value.new
        },
        created_at: new Date()
    };

    Updates.insert(update);
});
