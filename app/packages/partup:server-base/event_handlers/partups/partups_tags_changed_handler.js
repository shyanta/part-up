Event.on('partups.tags.changed', function (userId, partup, value) {
    if (! userId) return;

    var changes = Partup.services.tags.calculateChanges(value.old, value.new);

    changes.forEach(function (change) {
        var update = {
            partup_id: partup._id,
            upper_id: userId,
            created_at: new Date(),
            updated_at: new Date()
        };

        if (change.type === 'changed') {
            update.type = 'partups_tags_changed';
            update.type_data = {
                old_tag: change.old_tag,
                new_tag: change.new_tag
            }
        }

        if (change.type === 'added') {
            update.type = 'partups_tags_added';
            update.type_data = {
                new_tag: change.new_tag
            }
        }

        if (change.type === 'removed') {
            update.type = 'partups_tags_removed';
            update.type_data = {
                old_tag: change.old_tag
            }
        }

        Updates.insert(update);
        Log.debug('Update generated for Partup [' + partup._id + '] with type [' + update.type + '].');
    });
});
