Meteor.startup(function() {

    /*************************************************************/
    /* Language configuration */
    /*************************************************************/
    if (TAPi18n && Partup) {
        var detectedLocale = navigator.language || navigator.userLanguage;
        if (detectedLocale && detectedLocale.match(/^[a-z]{2}-[A-Z]{2}$/)) {
            detectedLocale = detectedLocale.split('-')[0];
        }

        //USERTEST DEFAULT IN DUTCH
        //var language = detectedLocale || 'nl';
        var language = 'nl';

        Partup.client.language.change(language);
    }

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
        var addClass = function addClass() {
            $body.addClass('bender-animating');
        };

        // Remove class on finish
        var removeClass = function removeClass() {
            $body.removeClass('bender-animating');
        };

        if (nextLayout === 'modal') {
            Bender.animate('slideOverUp', addClass, removeClass);
        } else if (nextLayout === 'app') {
            Bender.animate('slideOverUpClose', addClass, removeClass);
        }

        previousLayout = nextLayout;
        this.next();
    });

    /*************************************************************/
    /* Seo configuration */
    /*************************************************************/
    SEO.config({
        title: 'Part-up',
        meta: {
            'description': 'Just organize!',
            'image': '/images/logo.png',
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

});
