/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_recommendations.events({
    'click [data-closepage]': function eventClickClosePage(event, template) {
        event.preventDefault();
        Intent.return('recommendations');
    }
});
