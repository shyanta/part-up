/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.PartialsPartupDetailSidebar.rendered = function() {
    var OFFSET = 100;
    if(!document) return;
    var pageElm = document.querySelector('.pu-layout > .pu-sub-page');
    if(!pageElm) return;
    var rightElm = pageElm.querySelector('.pu-sub-partupdetail-right');
    if(!rightElm) return;

    var calculateBackgroundWidth = function calculateBackgroundWidth () {
        var backgroundWidth = (window.innerWidth - pageElm.offsetWidth) / 2 + rightElm.offsetWidth + OFFSET;
        Session.set('partials.partup-detail-sidebar.background-width', backgroundWidth);
    };

    window.addEventListener('resize', calculateBackgroundWidth);
    calculateBackgroundWidth();
};

/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.PartialsPartupDetailSidebar.helpers({

    backgroundWidth: function () {
        return Session.get('partials.partup-detail-sidebar.background-width') || 0;
    }

});


/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsPartupDetailSidebar.events({

    'click [data-joinsupporters]': function clickJoinsupporters () {
        Meteor.call('partups.supporters.insert', Router.current().params._id);
    }

});
