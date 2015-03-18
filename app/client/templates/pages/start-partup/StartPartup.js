/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesStartPartup.helpers({
    currentPage: function(page) {
        var router = Router.current().route.path(this);
        if (page) {
            var page = page.hash.samePage;
            if (page == router) {
                return true;
            } else {
                return false;
            }
        } else {
            return router;
        }
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesStartPartup.events({
    //
});