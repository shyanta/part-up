/**
 * Publish a count of all users
 */
Meteor.publish('users.count', function() {
    Counts.publish(this, 'users', Meteor.users.find());
});

/**
 * Publish a user
 *
 * @param {String} userId
 */
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

/**
 * Publish all partups a user is upper in
 *
 * @param {String} userId
 * @param {Object} options
 */
Meteor.publishComposite('users.one.upperpartups', function(userId, options) {
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
            {find: function(partup) { Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

/**
 * Publish a count of all partups a user is upper in
 *
 * @param {String} userId
 * @param {Object} options
 */
Meteor.publish('users.one.upperpartups.count', function(userId, options) {
    options = options || {};

    var parameters = {
        count: true
    };

    Counts.publish(this, 'users.one.upperpartups.filterquery', Partups.findUpperPartups(userId, options, parameters));
});

/**
 * Publish all partups a user is supporter of
 *
 * @param {String} userId
 * @param {Object} options
 */
Meteor.publishComposite('users.one.supporterpartups', function(userId, options) {
    options = options || {};

    return {
        find: function() {
            return Partups.findSupporterPartups(userId, options, this.userId);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup},
            {find: Meteor.users.findSupportersForPartup},
            {find: function(partup) { Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

/**
 * Publish a count of all partups a user is supporter of
 *
 * @param {String} userId
 * @param {Object} options
 */
Meteor.publish('users.one.supporterpartups.count', function(userId, options) {
    options = options || {};

    var parameters = {
        count: true
    };

    Counts.publish(this, 'users.one.supporterpartups.filterquery', Partups.findSupporterPartups(userId, options, parameters));
});

/**
 * Publish the loggedin user
 */
Meteor.publishComposite('users.loggedin', function() {
    return {
        find: function() {
            return Meteor.users.findSinglePrivateProfile(this.userId);
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
 * Publish multiple users by ids
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
