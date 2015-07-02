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
    'completeness': 1
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
    console.log(options)
    console.log(parameters)

    return Meteor.users.find({_id: {$in: userIds}}, options);
};
