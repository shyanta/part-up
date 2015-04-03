Event.on('partups.end_date.changed', function (partup, value) {
    var upper = Meteor.user();
    if (! upper) return;

    var update = {
        partup_id: partup._id,
        upper_id: upper._id,
        type: 'partups_end_date_changed',
        type_data: {
            old_end_date: value.old,
            new_end_date: value.new
        },
        created_at: new Date()
    };

    Updates.insert(update);
});
