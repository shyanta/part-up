Event.on('partups.tags.updated', function (partup, value) {
    var upper = Meteor.user();
    if (! upper) return;

    var changes = Partup.services.tags.calculateChanges(value.old, value.new);

    changes.forEach(function (change) {
        var update = {
            partup_id: partup._id,
            upper_id: upper._id,
            created_at: new Date()
        };

        if (change.type === 'changed') {
            update.type = 'partup_tag_changed';
            update.type_data = {
                old_tag: change.old_tag,
                new_tag: change.new_tag
            }
        }

        if (change.type === 'added') {
            update.type = 'partup_tag_added';
            update.type_data = {
                new_tag: change.new_tag
            }
        }

        if (change.type === 'removed') {
            update.type = 'partup_tag_removed';
            update.type_data = {
                old_tag: change.old_tag
            }
        }

        Updates.insert(update);
        Log.debug('Update generated for Partup [' + partup._id + '] with type [' + update.type + '].');
    });
});
