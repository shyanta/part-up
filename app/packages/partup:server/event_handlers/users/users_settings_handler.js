/**
 * Update the optionalDetailsCompleted settings when a user is updated
 */
Event.on('users.updated', function(userId, fields) {
    var user = Meteor.users.findOne({_id: userId});

    if (user) {
        if (!user.profile.settings || !user.profile.settings.optionalDetailsCompleted) {
            Meteor.users.update(userId, {$set: {'profile.settings.optionalDetailsCompleted': true}});
        }
    }
});
