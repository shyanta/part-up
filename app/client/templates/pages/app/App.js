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
/* Layout body class */
/*************************************************************/
Template.PagesApp.onRendered(function() {
    $('body').addClass('pu-currentlayout-app');
});
Template.PagesApp.onDestroyed(function() {
    $('body').removeClass('pu-currentlayout-app');
});