/**
 * @name Partup.publications.usersCount
 * @memberof Partup.server.publications
 */
Meteor.publish('users.count', function() {
    Counts.publish(this, 'users', Meteor.users.find());
});

Meteor.publishComposite('users.one', function(userId) {
    return {
        find: function() {
            return Meteor.users.findSinglePublicProfile(userId);
        },
        children: [
            {find: Images.findForUser}
        ]
    };
});

Meteor.publishComposite('users.one.upperpartups', function(userId, options) {
    var self = this;

    options = options || {};

    return {
        find: function() {
            return Partups.findUpperPartups(userId, options);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: Meteor.users.findSupportersForPartup},
            {find: Networks.findForPartup, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

Meteor.publish('users.one.upperpartups.count', function(userId, options) {
    var self = this;

    options = options || {};

    var parameters = {
        count: true
    };

    Counts.publish(this, 'users.one.upperpartups.filterquery', Partups.findUpperPartups(userId, options, parameters));
});

Meteor.publishComposite('users.one.supporterpartups', function(options, userId) {
    var self = this;
    var userId = userId || self.userId;
    options = options || {};

    return {
        find: function() {
            return Partups.findSupporterPartups(userId, options);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup},
            {find: Meteor.users.findSupportersForPartup},
            {find: Networks.findForPartup, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

Meteor.publish('users.one.supporterpartups.count', function(options, userId) {
    var self = this;
    var userId = userId || self.userId;
    options = options || {};

    var parameters = {
        count: true
    };

    Counts.publish(this, 'users.one.supporterpartups.filterquery', Partups.findSupporterPartups(userId, options, parameters));
});

Meteor.publishComposite('users.loggedin', function() {
    var self = this;

    return {
        find: function() {
            return Meteor.users.findSinglePrivateProfile(self.userId);
        },
        children: [
            {find: Images.findForUser},
            {find: Networks.findForUser, children: [
                {find: Images.findForNetwork}
            ]},
            {find: Notifications.findForUser, children: [
                {find: Images.findForNotification}
            ]}
        ]
    };
});

/**
 * Publish users based on an array of user ids
 *
 * @param {[String]} userIds
 */
Meteor.publishComposite('users.by_ids', function(userIds) {
    return {
        find: function() {
            return Meteor.users.findMultiplePublicProfiles(userIds);
        },
        children: [
            {find: Images.findForUser},
            {find: Invites.findForUser}
        ]
    };
});
