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
 * Find a user and expose it's private fields
 *
 * @memberOf Meteor.users
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Meteor.users.findSinglePrivateProfile = function(userId) {
    return Meteor.users.find({_id: userId}, {fields: privateUserFields});
};

/**
 * Find a user and expose it's public fields
 *
 * @memberOf Meteor.users
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Meteor.users.findSinglePublicProfile = function(userId) {
    return Meteor.users.find({_id: userId}, {fields: publicUserFields});
};

/**
 * Find users and expose their public fields
 *
 * @memberOf Meteor.users
 * @param {[String]} userIds
 * @param {Object} options
 * @param {Object} parameters
 * @return {Mongo.Cursor}
 */
Meteor.users.findMultiplePublicProfiles = function(userIds, options, parameters) {
    var options = options || {};
    var parameters = parameters || {};

    options.fields = publicUserFields;

    options.limit = parameters.count ? undefined : parseInt(options.limit) || undefined;
    options.sort = parameters.count ? undefined : options.sort || undefined;

    return Meteor.users.find({_id: {$in: userIds}}, options);
};

/**
 * Find uppers for a network
 *
 * @memberOf Meteor.users
 * @param {Network} network
 * @return {Mongo.Cursor}
 */
Meteor.users.findUppersForNetwork = function(network) {
    var uppers = network.uppers || [];
    return Meteor.users.findMultiplePublicProfiles(uppers);
};

/**
 * Find uppers for a partup
 *
 * @memberOf Meteor.users
 * @param {Partup} partup
 * @return {Mongo.Cursor}
 */
Meteor.users.findUppersForPartup = function(partup) {
    var uppers = partup.uppers || [];
    return Meteor.users.findMultiplePublicProfiles(uppers);
};

/**
 * Find supporters for a partup
 *
 * @memberOf Meteor.users
 * @param {Partup} partup
 * @return {Mongo.Cursor}
 */
Meteor.users.findSupportersForPartup = function(partup) {
    var supporters = partup.supporters || [];
    return Meteor.users.findMultiplePublicProfiles(supporters);
};

/**
 * Find the user of an update
 *
 * @memberOf Meteor.users
 * @param {Update} update
 * @return {Mongo.Cursor}
 */
Meteor.users.findUserForUpdate = function(update) {
    return Meteor.users.findSinglePublicProfile(update.upper_id);
};

/**
 * Find the user of a rating
 *
 * @memberOf Meteor.users
 * @param {Rating} rating
 * @return {Mongo.Cursor}
 */
Meteor.users.findForRating = function(rating) {
    return Meteor.users.findSinglePublicProfile(rating.upper_id);
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
        },

        /**
         * Check if user is admin
         *
         * @return {Boolean}
         */
        isAdmin: function() {
            if (!user) return false;
            if (!user.roles) return false;
            return user.roles.indexOf('admin') > -1;
        }
    };
};
