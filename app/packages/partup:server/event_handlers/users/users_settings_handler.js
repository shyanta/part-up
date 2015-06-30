/**
 * Update the optionalDetailsCompleted settings when a user is updated
 */
Event.on('users.updated', function(userId, fields) {
    var user = Meteor.users.findOne({_id: userId});

    if (user) {
        if (!user.profile.settings || !user.profile.settings.optionalDetailsCompleted) {
            Meteor.users.update(userId, {$set: {'profile.settings.optionalDetailsCompleted': true}});
        }

        // Store new tags into collection
        Partup.services.tags.insertNewTags(partup.tags);

        // Calculate new profile completeness percentage
        var totalValues = 0;
        var providedValues = 0;

        _.each(fields, function(value, key) {
            // skip all non-profile values
            if (!/^profile\./.test(key)) return;

            if (_.isObject(value)) {
                var doesContainValue = !mout.object.every(value, function(objectValue) {
                    return !objectValue;
                });
                if (doesContainValue) providedValues++;
            } else if (value !== undefined && value !== '' && value !== null) {
                providedValues++;
            }
            totalValues++;
        });

        var profileCompleteness = Math.round((providedValues * 100) / totalValues);
        Meteor.users.update(userId, {$set: {completeness: profileCompleteness}});
    }
});
