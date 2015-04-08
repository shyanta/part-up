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
        if(!partup) return '...';
        return moment(partup.end_date).format('LL'); // see: helpers/dateFormatters.js -> partupDateNormal
    },

    'prettyVisibility': function helperPrettyVisibility () {
        var partup = this.partup();
        if(!partup) return '...';
        return TAPi18n.__('partup-detail-visibility-' + partup.visibility);
    },

    'numberOfSupporters': function() {
        var partup = this.partup();
        if(!partup) return '...'
        return partup.supporters ? partup.supporters.length : '0';
    }

});


/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsPartupDetailSidebar.events({

    'click [data-joinsupporters]': function clickJoinsupporters () {
        Meteor.call('partups.supporters.insert', Router.current().params._id);
    },

    'click [data-share-facebook]': function clickShareFacebook () {
        var url = Router.current().location.get().href;
        var facebookUrl = Partup.ui.socials.generateFacebookShareUrl(url);
        window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function clickShareFacebook (event, template) {
        var url = Router.current().location.get().href;
        var message = template.data.partup().name;
        // TODO: I18n + wording
        var twitterUrl = Partup.ui.socials.generateTwitterShareUrl(message, url);
        window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function clickShareLinkedin () {
        var url = Router.current().location.get().href;
        var linkedInUrl = Partup.ui.socials.generateLinkedInShareUrl(url);
        window.open(linkedInUrl, 'pop', 'width=600, height=400, scrollbars=no');
    }

});
