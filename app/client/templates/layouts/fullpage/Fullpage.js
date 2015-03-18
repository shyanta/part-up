/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.LayoutsFullpage.helpers({
    
    currentPage: function() {
        return Router.current().route.path(this);
    }
    
});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.LayoutsFullpage.events({
    
    //
    
});