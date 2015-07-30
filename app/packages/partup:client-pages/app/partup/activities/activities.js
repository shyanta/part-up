var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_partup_activities.onCreated(function() {
    var tpl = this;

    tpl.partupId = tpl.data.partupId;

    tpl.activities = {

        // States
        loading: new ReactiveVar(false),

        // Filter
        filter: new ReactiveVar('default'),

        // All activities
        all: function(options) {
            var options = options || {};

            var filter = tpl.activities.filter.get();

            var partup = Partups.findOne(tpl.partupId);

            var activities = Activities
                .findForPartup(partup, {sort: {end_date: -1}}, {archived: !!options.archived})
                .fetch()
                .filter(function(activity, idx) {
                    if (filter === 'my-activities')
                        return activity.creator_id && activity.creator_id === Meteor.user()._id;

                    if (filter === 'open-activities')
                        return Contributions.findForActivity(activity).count() === 0;

                    return true;
                });

            return activities;
        }
    };

    // Partup findOne and activities subscription
    tpl.activities.loading.set(true);
    var sub = Subs.subscribe('activities.from_partup', tpl.partupId);

    tpl.autorun(function(c) {
        var partup = Partups.findOne(tpl.partupId);

        if (partup && sub.ready()) {
            c.stop();
            tpl.activities.loading.set(false);
        }
    });
});

Template.app_partup_activities.helpers({
    partupId: function() {
        return Template.instance().partupId;
    },
    activities: function() {
        var partup = Partups.findOne(this.partupId);
        return Template.instance().activities.all({archived: false});
    },
    archivedActivities: function() {
        return Template.instance().activities.all({archived: true});
    },
    isUpper: function() {
        var templateData = Template.currentData();

        var user = Meteor.user();
        if (!user) return false;

        var partupId = templateData.partupId || templateData.partup_id;
        var partup = Partups.findOne(partupId);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    },
    filterReactiveVar: function() {
        return Template.instance().activities.filter;
    },

    // Loading state
    activitiesLoading: function() {
        return Template.instance().activities.loading.get();
    }

});

Template.app_partup_activities.events({
    'click [data-new-activity]': function(event, template) {
        event.preventDefault();

        var userId = Meteor.userId();
        var proceed = function() {
            Partup.client.popup.open('new-activity');
        };

        if (!userId) {
            Intent.go({route: 'login'}, function(user) {
                if (user) proceed();
            });
        } else {
            proceed();
        }
    }
});
