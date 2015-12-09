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
 * @param {Object} urlParams
 * @param {Object} parameters
 */
Meteor.publishComposite('users.one.upperpartups', function(urlParams, parameters) {
    if (this.unblock) this.unblock();

    check(urlParams, {
        id: Match.Optional(String),
    });

    parameters = parameters || {};
    if (parameters.limit) parameters.limit = parseInt(parameters.limit);
    if (parameters.skip) parameters.skip = parseInt(parameters.skip);

    check(parameters, {
        limit: Match.Optional(Number),
        skip: Match.Optional(Number)
    });

    var options = {};
    if (parameters.limit) options.limit = parameters.limit;
    if (parameters.skip) options.skip = parameters.skip;

    return {
        find: function() {
            var user = Meteor.users.findOne(urlParams.id);
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
            ]}
        ]
    };
}, {url: 'users/:id/upperpartups', getArgsFromRequest: function(request) {
    return [request.params, request.query];
}});

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
 * @param {Object} urlParams
 * @param {Object} parameters
 */
Meteor.publishComposite('users.one.supporterpartups', function(urlParams, parameters) {
    if (this.unblock) this.unblock();

    check(urlParams, {
        id: Match.Optional(String),
    });

    parameters = parameters || {};
    if (parameters.limit) parameters.limit = parseInt(parameters.limit);
    if (parameters.skip) parameters.skip = parseInt(parameters.skip);

    check(parameters, {
        limit: Match.Optional(Number),
        skip: Match.Optional(Number)
    });

    var options = {};
    if (parameters.limit) options.limit = parameters.limit;
    if (parameters.skip) options.skip = parameters.skip;

    return {
        find: function() {
            var user = Meteor.users.findOne(urlParams.id);
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
}, {url: 'users/:id/supporterpartups', getArgsFromRequest: function(request) {
    return [request.params, request.query];
}});

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
