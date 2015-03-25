Meteor.methods({
    /**
     * Update a user
     *
     * @param {mixed[]} fields
     */
    'users.update': function (fields) {

        check(fields, Partup.schemas.forms.registerOptional);

        var upper = Meteor.user();

        if (! upper) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var profileFields = Partup.transformers.profile.fromFormRegisterOptional(fields);
            Meteor.users.update(upper._id, {$set:profileFields});
            Event.emit('users.updated', upper._id, profileFields);

            return {
                _id: upper._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be updated.');
        }
    }
});