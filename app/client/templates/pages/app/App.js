/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.PagesApp.helpers({
    
    //
    
});


/*************************************************************/
/* Layout events */
/*************************************************************/
Template.PagesApp.events({
    
    //
    
});

/*************************************************************/
/* Page rendered */
/*************************************************************/
Template.PagesApp.onRendered(function () {
    var $body = $('body');
    $body.removeClass('pu-state-currentlayout-modal');
    $body.addClass('pu-state-currentlayout-app');
});