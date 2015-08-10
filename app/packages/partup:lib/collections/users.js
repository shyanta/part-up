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
    'emails': 1,
    'pending_networks': 1
}, publicUserFields);

// Add indices
if (Meteor.isServer) {
    Meteor.users._ensureIndex('participation_score');
}

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
 * Find the uppers in a network
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
 * Find the uppers of a partup
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
 * Find the supporters of a partup
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
 * Find the user of a contribution
 *
 * @memberOf Meteor.users
 * @param {Contribution} contribution
 * @return {Mongo.Cursor}
 */
Meteor.users.findForContribution = function(contribution) {
    return Meteor.users.findSinglePublicProfile(contribution.upper_id);
};

/**
 * Find for admin list
 *
 * @memberOf Meteor.users
 * @param {Contribution} contribution
 * @return {Mongo.Cursor}
 */
Meteor.users.findForAdminList = function() {
    return Meteor.users.find({}, {
        fields:{'_id':1, 'profile.name':1, 'profile.phonenumber':1, 'registered_emails':1, 'createdAt':1},
        sort: {'createdAt': 1}
    });
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
            if (!name) return;

            if (name.match(/.*\s.*/)) {
                return name.split(' ')[0];
            } else {
                return name;
            }
        },

        isPartnerInPartup: function(partupId) {
            var upperOf = user.upperOf || [];
            return upperOf.indexOf(partupId) > -1;
        },

        /**
         * Get user's locale code
         */
        getLocale: function() {
            if (!user) return 'nl';

            var locale = mout.object.get(user, 'profile.settings.locale') || 'nl';

            if (!mout.object.has(TAPi18n.getLanguages(), locale)) {
                locale = 'nl';
            }

            return locale;
        },

        /**
         * Get users email adress
         *
         * @return {String}
         */
        getEmail: function() {
            if (!user) return undefined;
            if (user.emails && user.emails.length > 0) {
                return user.emails[0].address;
            }
            if (user.registered_emails && user.registered_emails.length > 0) {
                return user.registered_emails[0].address;
            }
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
        },

        /**
         * Get the user score
         *
         * @return {Number} participation score rounded
         */
        getReadableScore: function() {
            if (!user) return undefined;

            var score = user.participation_score ? user.participation_score : 0;

            // For design purposes, we only want to display
            // a max value of 99 and a min value of 10,
            // every number should be a natural one
            score = Math.min(99, score);
            score = Math.max(10, score);
            score = Math.round(score);

            return score;
        }
    };
};
