/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.PartialsPartupDetailNavigation.rendered = function() {
    var OFFSET = 100;
    var pageElm = document.querySelector('.pu-layout .pu-sub-page');
    var navElm = pageElm.querySelector('.pu-navigation');

    var calculateBackgroundWidth = function calculateBackgroundWidth () {
        var backgroundWidth = (window.innerWidth - pageElm.offsetWidth) / 2 + navElm.offsetWidth + OFFSET;
        Session.set('partials.partup-detail-navigation.background-width', backgroundWidth);
    };
    
    window.addEventListener('resize', calculateBackgroundWidth);
    calculateBackgroundWidth();
};

/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.PartialsPartupDetailNavigation.helpers({
    
    backgroundWidth: function () {
        return Session.get('partials.partup-detail-navigation.background-width') || 0;
    }
    
});


/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsPartupDetailNavigation.events({
    
    //
    
});