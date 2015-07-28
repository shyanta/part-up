/*************************************************************/
/* Widget initial */
/*************************************************************/
var getActivities = function(partupId) {
    return Activities.find({partup_id: partupId}, {sort: {created_at: -1}});
};

Template.modal_create_activities.onCreated(function() {
    this.subscribe('partups.one', this.data.partupId);

    var activities_sub = this.subscribe('activities.from_partup', this.data.partupId);
    this.autorun(function(c) {
        if (activities_sub.ready()) {
            c.stop();
            Meteor.defer(Partup.client.scroll.triggerUpdate);
        }
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_activities.helpers({
    Partup: Partup,
    partupActivities: function() {
        return getActivities(this.partupId);
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
        var templateData = Template.currentData();

        var userId = Meteor.userId();
        if (!userId) return false;

        var partupId = templateData.partupId;
        if (!partupId) return false;

        var partup = Partups.findOne(partupId);
        if (!partup) return false;

        return partup.hasUpper(userId);
    },
    fixFooter: function() {
        return Partup.client.scroll.pos.get() < Partup.client.scroll.maxScroll() - 50;
    },
});
