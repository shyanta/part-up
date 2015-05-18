/*************************************************************/
/* Widget initial */
/*************************************************************/

//

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartActivities.helpers({
    Partup: Partup,
    partupActivities: function helperPartupActivities () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
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
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartActivities.events({
    'click [data-popup]': function openPopup (event, template){
        Partup.ui.popup.open();
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/