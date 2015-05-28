/*************************************************************/
/* Widget initial */
/*************************************************************/
var getActivities = function () {
    var partupId = Session.get('partials.start-partup.current-partup');
    return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
};
//

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartActivities.helpers({
    Partup: Partup,
    partupActivities: function helperPartupActivities () {
        return getActivities();
    },
    currentPartupId: function helperCurrentPartupId () {
        return Session.get('partials.start-partup.current-partup');
    },
    createCallback: function helperCreateCallback () {
        var template = Template.instance();
        return function (activityId) {
            setTimeout(function () {
                var activityCreateElm = $('.pu-block-activity-create');
                var activityElm = $('[data-activity-id=' + activityId + ']');
                var activityOffset = activityCreateElm.offset().top;
                var maxScroll = $(document).height() - window.innerHeight;

                $('html, body').animate({
                    scrollTop: Math.min(activityOffset - 20, maxScroll)
                }, 250, "swing", function () {
                    activityElm.addClass('pu-state-highlight');
                });
            });
        };
    },
    showActivityPlaceholder: function helperShowActivityPlaceholder () {
        return getActivities().count() === 0;
    },
    placeholderActivity: function helperPlaceholderActivity () {
        return {
            name: __('startactivities-placeholder-name'),
            description: __('startactivities-placeholder-description')
        }
    },
    isUpper: function isUpper () {
        var user = Meteor.user();
        if (!user) return false;

        var partupId = Session.get('partials.start-partup.current-partup');
        if (!partupId) return false
            
        var partup = Partups.findOne(partupId);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartActivities.events({
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/