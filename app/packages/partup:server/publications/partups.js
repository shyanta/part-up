/**
 * Publish multiple partups by ids
 *
 * @param {[String]} partupIds
 */
Meteor.publishComposite('partups.by_ids', function(partupIds) {
    check(partupIds, [String]);

    this.unblock();

    return {
        find: function() {
            return Partups.guardedFind(this.userId, {_id: {$in: partupIds}});
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup, children: [
                {find: Images.findForUser}
            ]},
            {find: function(partup) {
                if (!get(partup, 'featured.active')) return;
                return Meteor.users.findSinglePublicProfile(partup.featured.by_upper._id);
            }, children: [
                {find: Images.findForUser}
            ]},
            {find: function(partup) { return Networks.findForPartup(partup, this.userId); }, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

/**
 * Publish a list of partups
 */
Meteor.publish('partups.list', function() {
    this.unblock();

    return Partups.guardedFind(this.userId, {}, {_id: 1, name: 1});
});

/**
 * Publish all featured partups
 */
Meteor.publish('partups.featured_all', function() {
    this.unblock();

    var user = Meteor.users.findOne(this.userId);
    if (!User(user).isAdmin()) return;

    return Partups.find({'featured.active': true}, {featured: 1});
});

/**
 * Publish a single partup
 *
 * @param {String} partupId
 * @param {String} accessToken
 */
Meteor.publishComposite('partups.one', function(partupId, accessToken) {
    check(partupId, String);
    if (accessToken) check(accessToken, String);

    this.unblock();

    return {
        find: function() {
            return Partups.guardedMetaFind({_id: partupId}, {limit: 1});
        },
        children: [
            {
                find: function() {
                    return Partups.guardedFind(this.userId, {_id: partupId}, {limit: 1}, accessToken);
                },
                children: [
                    {find: Images.findForPartup},
                    {find: function(partup) { return Networks.findForPartup(partup, this.userId); }, children: [
                        {find: Images.findForNetwork}
                    ]},
                    {find: Meteor.users.findUppersForPartup, children: [
                        {find: Images.findForUser}
                    ]},
                    {find: Meteor.users.findSupportersForPartup, children: [
                        {find: Images.findForUser}
                    ]}
                ]
            }
        ]
    };
});
