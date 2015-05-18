/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.PagesModal.helpers({
    
    focusLayerEnabled: function helperFocusLayerEnabled () {
        return Partup.ui.focuslayer.state.get();
    }
    
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesModal.events({
    
    // 'click [data-focuslayer]': function eventsClickFocuslayer () {
    //     Partup.ui.focuslayer.disable();
    // }
    
});

/*************************************************************/
/* Page rendered */
/*************************************************************/
Template.PagesModal.onRendered(function () {
    var $body = $('body');
    $body.removeClass('pu-state-currentlayout-app');
    $body.addClass('pu-state-currentlayout-modal');
});