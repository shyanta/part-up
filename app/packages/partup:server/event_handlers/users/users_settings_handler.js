/**
 * Update the optionalDetailsCompleted settings when a user is updated
 */
Event.on('users.updated', function(userId, fields) {
    var user = Meteor.users.findOne({_id: userId});

    if (user) {
        if (!user.profile.settings || !user.profile.settings.optionalDetailsCompleted) {
            Meteor.users.update(userId, {$set: {'profile.settings.optionalDetailsCompleted': true}});
        }

        // Calculate new registration percentage
        var providedValues = 0;
        _.each(fields, function(value, key) {
            if (_.isObject(value)) {
                var doesContainValue = !mout.object.every(value, function(objectValue) {
                    return !objectValue;
                });
                if (doesContainValue) providedValues++;
            } else if (value !== undefined && value !== '' && value !== null) {
                providedValues++;
            }
        });
        var profileCompleteness = Math.round(providedValues / Object.keys(fields).length * 100);
        Meteor.users.update(userId, {$set: {completeness: profileCompleteness}});
    }
});
