/*************************************************************/
/* Partial rendered */
/*************************************************************/

Template.app_partup_navigation.onCreated(function() {
    var template = this;
    template.shareDropdownState = new ReactiveVar(false);
});
Template.app_partup_navigation.onRendered(function() {
    var template = this;
    // Offset to improve window resizing behaviour
    var OFFSET = 100;

    // Find page element
    var pageElm = $('.pu-partuppagelayout');
    if (!pageElm) return;

    // Find left side element
    var leftElm = $('> .pu-sub-partupdetail-left', pageElm);
    if (!leftElm) return;

    // Calculate navigation background width
    template.calculateBackgroundWidth = function() {
        var backgroundWidth = (window.innerWidth - pageElm.width()) / 2 + leftElm.width() + OFFSET;
        Session.set('partials.partup-detail-navigation.background-width', backgroundWidth);
    };

    // Trigger calculations
    window.addEventListener('resize', template.calculateBackgroundWidth);
    template.calculateBackgroundWidth();
    Meteor.defer(template.calculateBackgroundWidth);
});

Template.app_partup_navigation.onDestroyed(function() {
    var template = this;
    window.removeEventListener('resize', template.calculateBackgroundWidth);
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
    },
    shareDropdownState: function() {
        return Template.instance().shareDropdownState;
    }
});

Template.app_partup_navigation.events({
    'click [data-open-share-dropdown]': function(event, template) {
        event.preventDefault();
        template.shareDropdownState.set(!template.shareDropdownState.curValue);
    },
    'click [data-openpartupsettings]': function(event, template) {
        event.preventDefault();

        var partup = Partups.findOne(template.data.partupId);

        Intent.go({
            route: 'partup-settings',
            params: {
                slug: partup.slug
            }
        });
    },
    'click [data-share-facebook]': function(event, template) {
        var partup = Partups.findOne(template.data.partupId);
        var currentUrl = Router.url('partup', {slug: partup.slug});
        var shareUrl = Partup.client.socials.generateFacebookShareUrl(currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');

        analytics.track('partup share facebook', {
            partupId: partup._id,
        });
    },

    'click [data-share-twitter]': function(event, template) {
        var partup = Partups.findOne(template.data.partupId);
        var currentUrl = Router.url('partup', {slug: partup.slug});
        var message = partup.name;
        var shareUrl = Partup.client.socials.generateTwitterShareUrl(message, currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');

        analytics.track('partup share twitter', {
            partupId: partup._id,
        });
    },

    'click [data-share-linkedin]': function(event, template) {
        var partup = Partups.findOne(template.data.partupId);
        var currentUrl = Router.url('partup', {slug: partup.slug});
        var shareUrl = Partup.client.socials.generateLinkedInShareUrl(currentUrl);
        window.open(shareUrl, 'pop', 'width=600, height=400, scrollbars=no');

        analytics.track('partup share linkedin', {
            partupId: partup._id,
        });
    },

    'click [data-share-mail]': function(event, template) {
        var partup = Partups.findOne(template.data.partupId);
        var user = Meteor.user();
        var currentUrl = Router.url('partup', {slug: partup.slug});
        if (!user) {
            var body = TAPi18n.__('pages-app-partup-share_mail_anonymous', {url: currentUrl, partup_name: partup.name});
        } else {
            var body = TAPi18n.__('pages-app-partup-share_mail', {url: currentUrl, partup_name: partup.name, user_name: user.profile.name});
        }
        var subject = '';
        var shareUrl = Partup.client.socials.generateMailShareUrl(subject, body);
        window.location.href = shareUrl;
    },
});
