Meteor.methods({
    /**
     * Update a user's settings
     *
     * @param {object} data
     */
    'settings.update': function(data) {
        check(data, Partup.schemas.entities.settings);

        var upper = Meteor.user();
        if (!upper) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            var settings = _.extend(upper.profile.settings, data);

            Meteor.users.update(upper._id, {$set: {'profile.settings': settings}});
            Event.emit('settings.updated', upper._id, settings);

            return {_id: upper._id};
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be updated.');
        }
    }
});
