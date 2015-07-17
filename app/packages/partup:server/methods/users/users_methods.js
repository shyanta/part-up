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
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be updated.');
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
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be updated.');
        }
    },

    'users.update.language': function(fields) {
        var upper = Meteor.user();
        if (!upper) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            var profileFields = {
                'profile.language': fields.language
            };

            var newProfile = _.extend(upper.profile, profileFields);

            Meteor.users.update(upper._id, {$set:newProfile});
            Event.emit('users.updated', upper._id, newProfile);

            return {
                _id: upper._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be updated.');
        }
    }
});
