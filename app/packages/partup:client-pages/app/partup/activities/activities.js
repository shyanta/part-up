/**
 * Activities created
 */
Template.app_partup_activities.onCreated(function() {
    var tpl = this;

    tpl.subscribe('partups.one', tpl.data.partupId);
    tpl.activitiesSubscription = tpl.subscribe('activities.from_partup', tpl.data.partupId);

    Meteor.autorun(function whenSubscriptionIsReady(computation) {
        if (tpl.activitiesSubscription.ready()) {
            computation.stop();
            tpl.activities.loading.set(false);
        }
    });

    tpl.activities = {

        // States
        loading: new ReactiveVar(true),
        rendering: new ReactiveVar(),

        // Filter
        filter: new ReactiveVar('default'),

        // All activities
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
