/*************************************************************/
/* Widget initial */
/*************************************************************/
var getActivities = function(partupId) {
    return Activities.find({partup_id: partupId}, {sort: {created_at: -1}});
};

Template.modal_create_activities.onCreated(function() {
    var partupId = mout.object.get(this, 'data.partupId') || Session.get('partials.create-partup.current-partup');
    var handle = this.subscribe('activities.from_partup', partupId);

    this.autorun(function(c) {
        if (handle.ready()) {
            c.stop();
            Meteor.defer(Partup.client.scroll.triggerUpdate);
        }
    });

    this.subscribe('partups.one', partupId);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_activities.helpers({
    Partup: Partup,
    partupActivities: function() {
        return getActivities(this.partupId);
    },
    currentPartupId: function() {
        return Session.get('partials.create-partup.current-partup');
    },
    createCallback: function() {
        var template = Template.instance();
        return function(activityId) {
            Meteor.defer(function() {

                Partup.client.scroll.to(template.find('.pu-activity-create'), 0, {
                    duration: 250,
                    callback: function() {
                        template.$('[data-activity-id=' + activityId + ']').addClass('pu-state-highlight');
                    }
                });

            });
        };
    },
    showActivityPlaceholder: function() {
        return getActivities(this.partupId).count() === 0;
    },
    placeholderActivity: function() {
        return {
            name: __('pages-modal-create-activities-placeholder-name'),
            description: __('pages-modal-create-activities-placeholder-description')
        };
    },
    isUpper: function() {
        var userId = Meteor.userId();
        if (!userId) return false;

        var partupId = Session.get('partials.create-partup.current-partup');
        if (!partupId) return false;

        var partup = Partups.findOne(partupId);
        if (!partup) return false;

        return partup.hasUpper(userId);
    },
    fixFooter: function() {
        return Partup.client.scroll.pos.get() < Partup.client.scroll.maxScroll() - 50;
    },
});
