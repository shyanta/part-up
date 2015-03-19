/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.PartialsPartupDetailSidebar.rendered = function() {
    var OFFSET = 100;
    var pageElm = document.querySelector('.pu-layout > .pu-sub-page');
    var rightElm = pageElm.querySelector('.pu-sub-partupdetail-right');

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
        Meteor.call('collections.partups.supporters.insert', Router.current().params._id);
    }
    
});