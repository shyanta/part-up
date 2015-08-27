/**
 * This component contains all of the generic shared front-end functionality
 *
 * @module client-base
 * @name client-base
 */
Meteor.startup(function() {
    Status.setTemplate('noconnection');
    // Check if Safari
    var is_safari = navigator.userAgent.indexOf('Safari') > -1;
    if (is_safari) {
        $('body').addClass('pu-safari');
    }
    // Check IE version
    window.PU_IE_VERSION = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
        if (re.exec(ua) != null) {
            window.PU_IE_VERSION = parseFloat(RegExp.$1);
        }
    }
    // var oldIE = /msie 8|msie 9|msie 10/i.test(navigator.userAgent);
    if (window.PU_IE_VERSION < 11 && window.PU_IE_VERSION > -1) {
        $('body').addClass('pu-no-pointer-events');
    }
    var preventHrefsFromChangingUrl = function(e) {
        e.preventDefault();
        return false;
    };
    $(document).on('click', '[href="#"]', preventHrefsFromChangingUrl);
    $(document).on('click', '[href=""]', preventHrefsFromChangingUrl);

    /*************************************************************/
    /* Current loggedin users subscription */
    /*************************************************************/
    Meteor.subscribe('users.loggedin');

    /*************************************************************/
    /* Language configuration */
    /*************************************************************/
    // sets the language of the user to user setting
    // or falls back to browser settings when user
    // logs in or out
    Meteor.autorun(function(computation) {
        var user = Meteor.user();
        // some of these methods have reactive vars
        // we dont't want unnessesary language changes
        Tracker.nonreactive(function() {
            if (user) {
                var language = mout.object.get(user, 'profile.settings.locale');
                Partup.client.language.change(language);
            } else {
                Partup.client.language.setToDefault();
            }
        });
    });

    /*************************************************************/
    /* Router animation */
    /*************************************************************/
    var previousLayout = '';
    Router.onBeforeAction(function() {
        var yieldRegions = this.route.options.yieldRegions;
        var nextLayout = '';

        // Check current template
        if (yieldRegions && yieldRegions.hasOwnProperty('modal')) {
            nextLayout = 'modal';
        } else if (yieldRegions && yieldRegions.hasOwnProperty('app')) {
            nextLayout = 'app';
        }

        // Check if previous layout and next layout aren't the same
        if (previousLayout === nextLayout) {
            this.next();
            return;
        }

        // Find body
        var $body = $('body');

        // Add class on start
        var start = function() {
            $body.addClass('bender-animating');
        };

        // Remove class on finish
        var done = function() {
            $body.removeClass('bender-animating');
        };

        if (nextLayout === 'modal') {
            Bender.animate('slideOverUp', start, done);
        } else if (nextLayout === 'app') {
            Bender.animate('slideOverUpClose', start, done);
        }

        previousLayout = nextLayout;
        this.next();
    });

    /*************************************************************/
    /* Scroll to the top on every page */
    /*************************************************************/
    Router.onAfterAction(function() {
        Meteor.defer(function() {
            Partup.client.scroll.to(null, 0);
        });
    });

    /*************************************************************/
    /* Seo configuration */
    /*************************************************************/
    SEO.config({
        title: Partup.client.notifications.createTitle('Part-up'),
        meta: {
            'description': 'Just organize!',
            'image': '/images/partup-logo.png',
            'title': 'Part-up'
        },
        og: {
            'site_name': location.hostname,
            'type': 'article'
        },
        twitter: {
            'card': 'summary',
            'site' : 'Part-up',
            'creator': '@Partupcom'
        },
        auto: {
            twitter: true,
            og: true,
            set: ['description', 'url', 'title', 'image']
        }
    });

    /*************************************************************/
    /* Intercom configuration */
    /*************************************************************/
    IntercomSettings.userInfo = function(user, info) {
        if (user) {
            info['email'] = User(user).getEmail();
            info['name'] = user.profile.name;
            info['firstname'] = user.profile.firstname;
            info['language'] = user.profile.settings.locale;
            info['phonenumber'] = user.profile.phonenumber;
            info['gender'] = user.profile.gender;
            info['participation_score'] = user.participation_score;
            info['completeness'] = user.completeness;
        }
    };

    /*************************************************************/
    /* Intent configuration */
    /*************************************************************/
    Intent.configure({
        debug: false,
        default_route_name: 'home'
    });

});
