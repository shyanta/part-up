/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.LayoutsApp.helpers({
    
    currentPage: function() {
        return Router.current().route.path(this);
    }
    
});


/*************************************************************/
/* Layout events */
/*************************************************************/
Template.LayoutsApp.events({
    
    //
    
});