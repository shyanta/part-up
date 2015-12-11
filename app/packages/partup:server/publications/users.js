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
 * @param {Object} request
 * @param {Object} params
 */
Meteor.routeComposite('/users/:id/upperpartups', function(request, params) {
    var options = {};

    if (request.limit) options.limit = parseInt(request.query.limit);
    if (request.skip) options.skip = parseInt(request.query.skip);

    return {
        find: function() {
            var user = Meteor.users.findOne(params.id);
            if (!user) return;

            return Partups.findUpperPartupsForUser(user, options, this.userId);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: function(partup) { return Networks.findForPartup(partup, this.userId); },
                children: [
                    {find: Images.findForNetwork}
                ]
            }
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
 * @param {Object} request
 * @param {Object} params
 */
Meteor.routeComposite('users/:id/supporterpartups', function(request, params) {
    var options = {};

    if (request.limit) options.limit = parseInt(request.query.limit);
    if (request.skip) options.skip = parseInt(request.query.skip);

    return {
        find: function() {
            var user = Meteor.users.findOne(params.id);
            if (!user) return;

            return Partups.findSupporterPartupsForUser(user, options, this.userId);
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: Meteor.users.findSupportersForPartup},
            {find: function(partup) { return Networks.findForPartup(partup, this.userId); },
            children: [
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
            if (this.userId) {
                return Meteor.users.findSinglePrivateProfile(this.userId);
            } else {
                this.ready();
            }
        },
        children: [
            {find: Images.findForUser},
            {find: function(user) {
                return Networks.findForUser(user, this.userId);
            },
            children: [
                {find: Images.findForNetwork}
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
    check(userIds, [String]);

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
