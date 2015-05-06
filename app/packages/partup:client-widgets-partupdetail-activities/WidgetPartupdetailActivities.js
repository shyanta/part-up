// Write your package code here!

Template.WidgetPartupdetailActivities.events({
    'click [data-newactivity]': function openNewActivityPopup(event, template){
        Partup.ui.popup.open();
        console.log("opening popup")
    }
})