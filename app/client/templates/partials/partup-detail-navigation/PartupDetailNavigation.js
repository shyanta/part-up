/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.PartialsPartupDetailNavigation.onRendered(function() {
    // Offset to improve window resizing behaviour
    var OFFSET = 100;

    // Find page element
    var pageElm = $('.pu-layout > .pu-sub-pagecontainer');
    if(!pageElm) return;

    // Find left side element
    var leftElm = $('> .pu-sub-partupdetail-left', pageElm);
    if(!leftElm) return;

    // Calculate navigation background width
    var calculateBackgroundWidth = function calculateBackgroundWidth () {
        var backgroundWidth = (window.innerWidth - pageElm.width()) / 2 + leftElm.width() + OFFSET;
        Session.set('partials.partup-detail-navigation.background-width', backgroundWidth);
    };
    
    // Trigger calculations
    window.addEventListener('resize', calculateBackgroundWidth);
    calculateBackgroundWidth();
});

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