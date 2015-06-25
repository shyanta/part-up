/**
 * Activities created
 */
Template.app_partup_activities.onCreated(function() {
    var tpl = this;

    tpl.subscription = tpl.subscribe('partups.one', tpl.data.partupId);

    tpl.activities = {
        filter: new ReactiveVar('default'),
        all: function(options) {
            var options = options || {};

            var filter = tpl.activities.filter.get();

            var selector = {
                partup_id: tpl.data.partupId,
                archived: !!options.archived
            };

            return Activities
                .find(selector, {sort: {end_date: -1}})
                .fetch()
                .filter(function(activity, idx) {
                    if (filter === 'default') return true;

                    if (filter === 'my-activities') {
                        return activity.creator_id && activity.creator_id === Meteor.user()._id;
                    }

                    if (filter === 'open-activities') {
                        return Contributions.find({activity_id: activity._id}).count() === 0;
                    }

                    return true;
                });
        }
    };
});

/**
 * Activities helpers
 */
Template.app_partup_activities.helpers({

    activities: function() {
        return Template.instance().activities.all();
    },
    archivedActivities: function() {
        return Template.instance().activities.all({archived: true});
    },
    isUpper: function() {
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne(Router.current().params._id);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    },
    filterReactiveVar: function() {
        return Template.instance().activities.filter;
    },
    isLoading: function() {
        return !Template.instance().subscription.ready();
    }

});
