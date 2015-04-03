Event.on('partups.name.changed', function (partup, value) {
    var upper = Meteor.user();
    if (! upper) return;

    var update = {
        partup_id: partup._id,
        upper_id: upper._id,
        type: 'partups_name_changed',
        type_data: {
            old_name: value.old,
            new_name: value.new
        },
        created_at: new Date()
    };

    Updates.insert(update);
});
