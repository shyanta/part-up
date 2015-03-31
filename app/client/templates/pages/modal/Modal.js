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
/* Layout body class */
/*************************************************************/
Template.PagesModal.onRendered(function() {
    $('body').addClass('pu-currentlayout-modal');
});
Template.PagesModal.onDestroyed(function() {
    $('body').removeClass('pu-currentlayout-modal');
});