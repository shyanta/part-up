/**
 * @namespace Users
 * @name Users
 */

//N.B.: Meteor.users is already defined by meteor

//user fields to all users
var publicUserFields = {
    'profile': 1,
    'status.online': 1,
    'partups': 1,
    'upperOf': 1,
    'supporterOf': 1,
    'average_rating': 1,
    'networks': 1,
    'completeness': 1,
    'participation_score': 1
};

//user fields exposed to logged in user
var privateUserFields = mout.object.merge({
    'emails': 1
}, publicUserFields);

/**
 * User collection helpers
 */
Meteor.users.findSinglePrivateProfile = function(userId) {
    return Meteor.users.find({_id: userId}, {fields: privateUserFields});
};

Meteor.users.findSinglePublicProfile = function(userId) {
    return Meteor.users.find({_id: userId}, {fields: publicUserFields});
};

Meteor.users.findMultiplePublicProfiles = function(userIds, options, parameters) {
    var options = options || {};
    var parameters = parameters || {};

    options.fields = publicUserFields;

    options.limit = parameters.count ? undefined : parseInt(options.limit) || undefined;
    options.sort = parameters.count ? undefined : options.sort || undefined;

    return Meteor.users.find({_id: {$in: userIds}}, options);
};

/**
 * User model (not a constructor, unlike all other entity models)
 * @ignore
 */
User = function(user) {

    return {

        /**
         * Get the first name of a user
         *
         * @return {String}
         */
        getFirstname: function() {
            if (!user) return;
            if (!user.profile) return;

            var name = user.profile.name || user.name;
            if (name && name.match(/.*\s.*/)) {
                return name.split(' ')[0];
            }
        },

        /**
         * Get user's locale code
         */
        getLocale: function() {
            if (!user) return 'nl';

            var locale = mout.object.get(user, 'settings.locale') || 'nl';

            if (!mout.object.has(TAPi18n.getLanguages(), locale)) {
                locale = 'nl';
            }

            return locale;
        }
    };
};
