/**
 * Publish a count of all users
 */
Meteor.publish('users.count', function() {
    this.unblock();

    Counts.publish(this, 'users', Meteor.users.find());
});

/**
 * Publish a user
 *
 * @param {String} userId
 */
Meteor.publishComposite('users.one', function(userId) {
    check(userId, String);

    this.unblock();

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
 * @param {Object} parameters
 */
Meteor.publishComposite('users.one.upperpartups', function(userId, parameters) {
    check(userId, String);

    parameters = parameters || {};
    check(parameters, {
        limit: Match.Optional(Number),
        sort: Match.Optional(String),
        count: Match.Optional(Boolean)
    });

    this.unblock();

    return {
        find: function() {
            var user = Meteor.users.findOne(userId);
            if (!user) return;

            return Partups.findUpperPartupsForUser(user, parameters, this.userId);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: Meteor.users.findSupportersForPartup},
            {find: function(partup) { return Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

/**
 * Publish a count of all partups a user is upper in
 *
 * @param {String} userId
 */
Meteor.publish('users.one.upperpartups.count', function(userId) {
    check(userId, String);

    this.unblock();

    var user = Meteor.users.findOne(userId);
    if (!user) return;

    Counts.publish(this, 'users.one.upperpartups.filterquery', Partups.findUpperPartupsForUser(user, {count:true}, this.userId));
});

/**
 * Publish all partups a user is supporter of
 *
 * @param {String} userId
 * @param {Object} parameters
 * @param {Number} parameters.limit
 * @param {String} parameters.sort
 * @param {Boolean} parameters.count
 */
Meteor.publishComposite('users.one.supporterpartups', function(userId, parameters) {
    check(userId, String);

    parameters = parameters || {};
    check(parameters, {
        limit: Match.Optional(Number),
        sort: Match.Optional(String),
        count: Match.Optional(Boolean)
    });

    this.unblock();

    return {
        find: function() {
            var user = Meteor.users.findOne(userId);
            if (!user) return;

            return Partups.findSupporterPartupsForUser(user, parameters, this.userId);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: Meteor.users.findSupportersForPartup},
            {find: function(partup) { return Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

/**
 * Publish a count of all partups a user is supporter of
 *
 * @param {String} userId
 */
Meteor.publish('users.one.supporterpartups.count', function(userId) {
    check(userId, String);

    this.unblock();

    var user = Meteor.users.findOne(userId);
    if (!user) return;

    Counts.publish(this, 'users.one.supporterpartups.filterquery', Partups.findSupporterPartupsForUser(user, {count: true}, this.userId));
});

/**
 * Publish the loggedin user
 */
Meteor.publishComposite('users.loggedin', function() {
    // this.unblock();

    return {
        find: function() {
            return Meteor.users.findSinglePrivateProfile(this.userId);
        },
        children: [
            {find: Images.findForUser},
            {find: function(user) {
                return Networks.findForUser(user, this.userId);
            },
            children: [
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
    check(userId, [String]);

    this.unblock();

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
