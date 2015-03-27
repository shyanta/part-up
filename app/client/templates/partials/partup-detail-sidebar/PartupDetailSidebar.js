/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.PartialsPartupDetailSidebar.rendered = function() {
    // Offset to improve window resizing behaviour
    var OFFSET = 100;

    // Find page element
    var pageElm = $('.pu-layout > .pu-sub-pagecontainer');
    if(!pageElm) return;

    // Find left side element
    var rightElm = $('> .pu-sub-partupdetail-right', pageElm);
    if(!rightElm) return;

    // Calculate navigation background width
    var calculateBackgroundWidth = function calculateBackgroundWidth () {
        var backgroundWidth = (window.innerWidth - pageElm.width()) / 2 + rightElm.width() + OFFSET;
        Session.set('partials.partup-detail-sidebar.background-width', backgroundWidth);
    };

    // Trigger calculations
    window.addEventListener('resize', calculateBackgroundWidth);
    calculateBackgroundWidth();
};


/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.PartialsPartupDetailSidebar.helpers({

    'backgroundWidth': function helperBackgroundWidth () {
        return Session.get('partials.partup-detail-sidebar.background-width') || 0;
    },

    'prettyEndDate': function helperPrettyEndDate () {
        var partup = this.partup();
        console.log(partup);
        return moment(partup.end_date).format('LL'); // see: helpers/dateFormatters.js -> partupDateNormal
    },

    'prettyVisibility': function helperPrettyVisibility () {
        var partup = this.partup();
        return TAPi18n.__('partup-detail-visibility-' + partup.visibility);
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
