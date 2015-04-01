/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.PagesModal.helpers({
    
    //
    
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesModal.events({
    
    //
    
});

/*************************************************************/
/* Page rendered */
/*************************************************************/
Template.PagesModal.onRendered(function () {
    var $body = $('body');
    $body.removeClass('pu-state-currentlayout-app');
    $body.addClass('pu-state-currentlayout-modal');
});