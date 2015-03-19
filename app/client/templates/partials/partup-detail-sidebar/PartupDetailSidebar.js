/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.PartialsPartupDetailSidebar.rendered = function() {
    var OFFSET = 100;
    var pageElm = document.querySelector('.pu-layout > .pu-sub-page');
    var sideElm = pageElm.querySelector('.pu-sub-right');

    var calculateBackgroundWidth = function calculateBackgroundWidth () {
        var backgroundWidth = (window.innerWidth - pageElm.offsetWidth) / 2 + sideElm.offsetWidth + OFFSET;
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
    
    //
    
});