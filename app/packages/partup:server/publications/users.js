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

    if (request.query) {
        if (request.query.limit) options.limit = parseInt(request.query.limit);
        if (request.query.skip) options.skip = parseInt(request.query.skip);
        if (request.query.archived) options.archived = JSON.parse(request.query.archived);
    }

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
 * Publish all partups a user is supporter of
 *
 * @param {Object} request
 * @param {Object} params
 */
Meteor.routeComposite('/users/:id/supporterpartups', function(request, params) {
    var options = {};

    if (request.query) {
        if (request.query.limit) options.limit = parseInt(request.query.limit);
        if (request.query.skip) options.skip = parseInt(request.query.skip);
        if (request.query.archived) options.archived = JSON.parse(request.query.archived);
    }

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
 * Publish all networks a user is in
 *
 * @param {Object} request
 * @param {Object} params
 */
Meteor.routeComposite('/users/:id/networks', function(request, params) {
    var options = {};

    if (request.query) {
        if (request.query.limit) options.limit = parseInt(request.query.limit);
        if (request.query.skip) options.skip = parseInt(request.query.skip);
    }

    return {
        find: function() {
            return Meteor.users.find(params.id, {fields: {networks: 1}});
        },
        children: [
            {
                find: function(user) {
                    return Networks.findForUser(user, this.userId, options);
                },
                children: [
                    {find: Images.findForNetwork}
                ]
            }
        ]
    };

});

/**
 * Publish all partners a user worked with
 *
 * @param {Object} request
 * @param {Object} params
 */
Meteor.routeComposite('/users/:id/partners', function(request, params) {
    var options = {};

    if (request.query) {
        if (request.query.limit) options.limit = parseInt(request.query.limit);
        if (request.query.skip) options.skip = parseInt(request.query.skip);
    }

    return {
        find: function() {
            return Meteor.users.find({_id: params.id}, {limit: 1});
        },
        children: [
            {
                find: function(user) {
                    return Meteor.users.findPartnersForUpper(user, options);
                },
                children: [{find: Images.findForUser}]
            }
        ]
    };
});

/**
 * Publish the loggedin user
 */
Meteor.publishComposite('users.loggedin', function() {
    return {
        find: function() {
            if (this.userId) {
                return Meteor.users.findSinglePrivateProfile(this.userId);
            } else {
                this.ready();
            }
        },
        children: [
            {find: Images.findForUser}
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
