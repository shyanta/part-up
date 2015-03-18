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
        activities: function() {
            var router = Router.current().route.path(this);
            if (router == '/startpartup/activities') {
                return true;
            }
        },
        contribute: function() {
            var router = Router.current().route.path(this);
            if (router == '/startpartup/contribute') {
                return true;
            }
        },
        promote: function() {
            var router = Router.current().route.path(this);
            if (router == '/startpartup/promote') {
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