/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.LayoutsApp.helpers({
    
    //
    
});


/*************************************************************/
/* Layout events */
/*************************************************************/
Template.LayoutsApp.events({
    
    //
    
});


/*************************************************************/
/* Layout body class */
/*************************************************************/
Template.LayoutsApp.onRendered(function() {
    $('body').addClass('pu-currentlayout-app');
});
Template.LayoutsApp.onDestroyed(function() {
    $('body').removeClass('pu-currentlayout-app');
});