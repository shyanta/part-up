/**
 * Publish all activities in a partup
 *
 * @param {String} partupId
 */
Meteor.publishComposite('activities.from_partup', function(partupId) {
    return {
        find: function() {
            var partup = Partups.guardedFind(this.userId, {_id: partupId}, {limit:1}).fetch().pop();
            if (!partup) return;

            return Activities.findForPartup(partup);
        },
        children: [
            {find: Updates.findForActivity},
            {find: Contributions.findForActivity, children: [
                {find: Meteor.users.findForContribution, children: [
                    {find: Images.findForUser}
                ]},
                {find: Ratings.findForContribution, children: [
                    {find: Meteor.users.findForRating, children: [
                        {find: Images.findForUser}
                    ]},
                ]}
            ]}
        ]
    };
});

