/*************************************************************/
/* Widget initial */
/*************************************************************/
var getActivities = function(partupId) {
    return Activities.find({partup_id: partupId}, {sort: {created_at: -1}});
};

Template.modal_create_activities.onCreated(function() {
    var partupId = mout.object.get(this, 'data.partupId') || Session.get('partials.create-partup.current-partup');
    this.subscribe('activities.from_partup', partupId);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_activities.helpers({
    Partup: Partup,
    partupActivities: function helperPartupActivities () {
        return getActivities(this.partupId);
    },
    currentPartupId: function helperCurrentPartupId () {
        return Session.get('partials.create-partup.current-partup');
    },
    createCallback: function helperCreateCallback () {
        var template = Template.instance();
        return function(activityId) {
            setTimeout(function() {
                var activityCreateElm = $('.pu-block-activity-create');
                var activityElm = $('[data-activity-id=' + activityId + ']');
                var activityOffset = activityCreateElm.offset().top;
                var maxScroll = $(document).height() - window.innerHeight;

                $('html, body').animate({
                    scrollTop: Math.min(activityOffset - 20, maxScroll)
                }, 250, 'swing', function() {
                    activityElm.addClass('pu-state-highlight');
                });
            });
        };
    },
    showActivityPlaceholder: function helperShowActivityPlaceholder () {
        return getActivities(this.partupId).count() === 0;
    },
    placeholderActivity: function helperPlaceholderActivity () {
        return {
            name: __('pages-modal-create-activities-placeholder-name'),
            description: __('pages-modal-create-activities-placeholder-description')
        }
    },
    isUpper: function isUpper () {
        var user = Meteor.user();
        if (!user) return false;

        var partupId = Session.get('partials.create-partup.current-partup');
        if (!partupId) return false

        var partup = Partups.findOne(partupId);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    }
});
