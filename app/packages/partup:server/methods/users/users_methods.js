Meteor.methods({
    /**
     * Register a user, it's the same ad update, only with a slightly different schema
     *
     * @param {mixed[]} fields
     */
    'users.register': function(fields) {

        check(fields, Partup.schemas.forms.registerOptional);

        var upper = Meteor.user();

        if (!upper) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            var profileFields = Partup.transformers.profile.fromFormRegisterOptional(fields);

            var newProfile = _.extend(upper.profile, profileFields);

            Meteor.users.update(upper._id, {$set:newProfile});
            Event.emit('users.updated', upper._id, newProfile);

            return {
                _id: upper._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'user_could_not_be_registered');
        }
    },
    /**
     * Update a user
     *
     * @param {mixed[]} fields
     */
    'users.update': function(fields) {

        check(fields, Partup.schemas.forms.profileSettings);

        var upper = Meteor.user();

        if (!upper) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            var profileFields = Partup.transformers.profile.fromFormProfileSettings(fields);

            var newProfile = _.extend(upper.profile, profileFields);

            Meteor.users.update(upper._id, {$set:newProfile});
            Event.emit('users.updated', upper._id, newProfile);

            return {
                _id: upper._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'user_could_not_be_updated');
        }
    }
});
