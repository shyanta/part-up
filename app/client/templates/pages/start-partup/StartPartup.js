/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesStartPartup.helpers({
    currentPage: {
        start: function() {
            var router = Router.current().route.path(this);
            if (router == '/startpartup/details') {
                return true;
            }
        },
        activiteiten: function() {
            var router = Router.current().route.path(this);
            if (router == '/startpartup/activiteiten') {
                return true;
            }
        },
        bijdragen: function() {
            var router = Router.current().route.path(this);
            if (router == '/startpartup/bijdragen') {
                return true;
            }
        },
        promoten: function() {
            var router = Router.current().route.path(this);
            if (router == '/startpartup/promoten') {
                return true;
            }
        }
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesStartPartup.events({
    //
});