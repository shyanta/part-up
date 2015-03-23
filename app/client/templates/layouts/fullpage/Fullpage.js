/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.LayoutsFullpage.helpers({
    
    //
    
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.LayoutsFullpage.events({
    
    //
    
});


/*************************************************************/
/* Layout body class */
/*************************************************************/
Template.LayoutsFullpage.onRendered(function() {
    $('body').addClass('pu-currentlayout-fullpage');
});
Template.LayoutsFullpage.onDestroyed(function() {
    $('body').removeClass('pu-currentlayout-fullpage');
});