/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.app_partup_navigation.onRendered(function() {
    // Offset to improve window resizing behaviour
    var OFFSET = 100;

    // Find page element
    var pageElm = $('.pu-partuppagelayout');
    if (!pageElm) return;

    // Find left side element
    var leftElm = $('> .pu-sub-partupdetail-left', pageElm);
    if (!leftElm) return;

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
Template.app_partup_navigation.helpers({
    partup: function() {
        return Partups.findOne(this.partupId);
    },
    backgroundWidth: function() {
        return Session.get('partials.partup-detail-navigation.background-width') || 0;
    }
});

Template.app_partup_navigation.events({
    'click [data-openpartupsettings]': function(event, template) {
        event.preventDefault();

        Intent.go({
            route: 'partup-settings',
            params: {
                slug: template.data.partup.slug
            }
        });
    }
});
