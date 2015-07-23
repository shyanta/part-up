Meteor.publishComposite('partups.ids', function(partupIds) {
    var self = this;

    return {
        find: function() {
            return Partups.guardedFind(self.userId, {_id: {$in: partupIds}});
        },
        children: [
            {find: Images.findForPartup},
            {find: Meteor.users.findUppersForPartup},
            {find: Networks.findForPartup, children: [
                {find: Images.findForNetwork}
            ]}
        ]
    };
});

Meteor.publish('partups.list', function() {
    return Partups.guardedFind(this.userId, {}, {_id: 1, name: 1});
});

/**
 * Publish all required data for a part-up
 *
 * This subscription will first check if the current user is allowed to view the
 * requested part-up. If so, the client will be allowed access to:
 *
 * - The part-up
 *   - Part-up's image
 *   - Public profiles + profile images for all uppers & supporters
 *   - The part-up's network
 *
 * @param {String} partupId - The part-up's id
 */
Meteor.publishComposite('partups.one', function(partupId) {
    var self = this;

    return {
        find: function() {
            return Partups.guardedMetaFind(self.userId, {_id: partupId}, {limit: 1});
        },
        children: [
            {
                find: function() {
                    return Partups.guardedFind(self.userId, {_id: partupId}, {limit: 1});
                },
                children: [
                    {find: Images.findForPartup},
                    {find: Networks.findForPartup},
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
