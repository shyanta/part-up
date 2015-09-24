Meteor.methods({
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
            var userFields = Partup.transformers.profile.fromFormProfileSettings(fields);
            userFields.profile.normalized_name = Partup.helpers.normalize(userFields.profile.name);

            // Merge the old profile so empty fields do not get overwritten
            var mergedProfile = _.extend(upper.profile, userFields.profile);

            Meteor.users.update(upper._id, {$set:{profile: mergedProfile}});
            Event.emit('users.updated', upper._id, userFields);

            return {
                _id: upper._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'user_could_not_be_updated');
        }
    },

    /**
     * Return a list of users based on search query
     *
     * @param {string} searchString
     */
    'users.autocomplete': function(searchString) {
        check(searchString, String);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            // Remove accents that might have been added to the query
            searchString = mout.string.replaceAccents(searchString.toLowerCase());

            return Meteor.users.findActiveUsers({'profile.normalized_name': new RegExp('.*' + searchString + '.*', 'i')}, {limit: 30}).fetch();
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'users_could_not_be_autocompleted');
        }
    },

    /**
     * Deactivate user
     *
     * @param  {string} userId
     */
    'users.deactivate': function(userId) {
        check(userId, String);

        var user = Meteor.user();
        if (!User(user).isAdmin()) {
            return;
        }

        var subject = Meteor.users.findOne(userId);
        if (!subject) throw new Meteor.Error(401, 'unauthorized');
        if (!User(subject).isActive()) throw new Meteor.Error(400, 'user_is_inactive');

        try {
            Meteor.users.update(subject._id, {$set:{
                deactivatedAt: new Date()
            }});

            Event.emit('users.deactivated', subject._id);

            return {
                _id: subject._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'user_could_not_be_deactivated');
        }
    },

    /**
     * Reactivate user
     *
     * @param  {string} userId
     */
    'users.reactivate': function(userId) {
        check(userId, String);

        var user = Meteor.user();
        if (!User(user).isAdmin()) {
            return;
        }

        var subject = Meteor.users.findOne(userId);
        if (!subject) throw new Meteor.Error(401, 'unauthorized');
        if (User(subject).isActive()) throw new Meteor.Error(400, 'user_is_active');

        try {
            Meteor.users.update(subject._id, {$unset:{
                deactivatedAt: ''
            }});

            Event.emit('users.reactivated', subject._id);

            return {
                _id: subject._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'user_could_not_be_reactivated');
        }
    },

    /**
    * Returns user data to superadmins only
    */
    'users.admin_all': function() {
        var user = Meteor.users.findOne(this.userId);
        if (!User(user).isAdmin()) {
            return;
        }
        return Meteor.users.findForAdminList().fetch();
    },

    /**
    * Returns user stats to superadmins only
    */
    'users.admin_stats': function() {
        var user = Meteor.users.findOne(this.userId);
        if (!User(user).isAdmin()) {
            return;
        }
        return Meteor.users.findStatsForAdmin();
    },

    /**
     * Returns user data to superadmins only
     */

    /* DISABLED UNTIL NEEDED IN FRONTEND
    'users.get_country': function() {
        var user = Meteor.user();

        if (user) {
            return user.profile.location.country;
        } else {
            var ip = this.connection.clientAddress;
            var response = HTTP.get('http://ip-api.com/json/' + ip);
            if (response.statusCode !== 200) {
                Log.error('IP API resulted in an error [' + response.statusCode + ']', response);
                return '';
            }
            var data = get(response, 'data');

            return data.country;
        }
    },
    */
});
