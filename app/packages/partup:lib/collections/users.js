/**
 * @namespace Users
 * @name Users
 */

//N.B.: Meteor.users is already defined by meteor

var publicUserFields = {
    'profile': 1,
    'status.online': 1,
    'partups': 1,
    'upperOf': 1,
    'supporterOf': 1,
    'average_rating': 1,
    'networks': 1
};

/**
 * User collection helpers
 */
Meteor.users.findSinglePublicProfile = function(userId) {
    return Meteor.users.find({_id: userId}, {fields: publicUserFields});
};

Meteor.users.findMultiplePublicProfiles = function(userIds) {
    return Meteor.users.find({_id: {$in: userIds}}, {fields: publicUserFields});
};
