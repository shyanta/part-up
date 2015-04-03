Event.on('partups.description.changed', function (partup, value) {
    var upper = Meteor.user();
    if (! upper) return;

    var update = {
        partup_id: partup._id,
        upper_id: upper._id,
        type: 'partups_description_changed',
        type_data: {
            old_description: value.old,
            new_description: value.new
        },
        created_at: new Date()
    };

    Updates.insert(update);
});
