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