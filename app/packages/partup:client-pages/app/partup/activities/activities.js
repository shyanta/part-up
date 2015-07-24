var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_partup_activities.onCreated(function() {
    var tpl = this;

    Subs.subscribe('activities.from_partup', tpl.data.partupId);

    tpl.activities = {

        // States
        loading: new ReactiveVar(false),
        rendering: new ReactiveVar(),

        // Filter
        filter: new ReactiveVar('default'),

        // All activities
        all: function(options) {
            var options = options || {};

            var filter = tpl.activities.filter.get();

            var activities = Activities
                .findForPartup(tpl.data.partupId, {sort: {end_date: -1}}, {archived: !!options.archived})
                .fetch()
                .filter(function(activity, idx) {
                    if (filter === 'my-activities')
                        return activity.creator_id && activity.creator_id === Meteor.user()._id;

                    if (filter === 'open-activities')
                        return Contributions.find({activity_id: activity._id}).count() === 0;

                    return true;
                });

            return activities;
        }
    };
});

Template.app_partup_activities.helpers({
    activities: function() {
        return Activities.findForPartup(this.partupId, {sort: {end_date: -1}}, {archived: false});
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

    // Loading / rendering state
    activitiesLoading: function() {
        return Template.instance().activities.loading.get();
    },
    activitiesLoadingOrRendering: function() {
        return Template.instance().activities.loading.get() || Template.instance().activities.rendering.get();
    },
    activitiesRenderedCallback: function() {
        var tpl = Template.instance();
        tpl.activities.rendering.set(true);
        return function() {
            tpl.activities.rendering.set(false);
        };
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
