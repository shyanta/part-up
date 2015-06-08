Meteor.methods({
    /**
     * Update a user
     *
     * @param {mixed[]} fields
     */
    'users.update': function(fields) {

        check(fields, Partup.schemas.forms.registerOptional);

        var upper = Meteor.user();

        if (!upper) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var profileFields = Partup.transformers.profile.fromFormRegisterOptional(fields);

            var newProfile = _.extend(upper.profile, profileFields);

            // Calculate new registration percentage
            var providedValues = 0;
            _.each(newProfile, function(value, key) {
                if (value !== undefined && value !== '' && value !== null) providedValues++;
            });
            newProfile.completeness = Math.round(providedValues / Object.keys(newProfile).length * 100);

            Meteor.users.update(upper._id, {$set:newProfile});
            Event.emit('users.updated', upper._id, newProfile);

            return {
                _id: upper._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be updated.');
        }
    }
});
