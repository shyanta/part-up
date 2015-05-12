Meteor.startup(function() {

    /*************************************************************/
    /* Language configuration */
    /*************************************************************/
    if(TAPi18n && Partup) {
        var detectedLocale = navigator.language || navigator.userLanguage;
        if(detectedLocale && detectedLocale.match(/^[a-z]{2}-[A-Z]{2}$/)) {
            detectedLocale = detectedLocale.split('-')[0];
        }

        //USERTEST DEFAULT IN DUTCH
        //var language = detectedLocale || 'nl';
        var language = 'nl';

        Partup.ui.language.changeLanguage(language);
    }


    /*************************************************************/
    /* Router transition configuration */
    /*************************************************************/
    var previousTemplateName = '';
    Router.onBeforeAction(function() {
        var yieldRegions = this.route.options.yieldRegions;
        var nextTemplateName = '';

        // Check current template
        if(yieldRegions.hasOwnProperty('PagesModal')) {
            nextTemplateName = 'modal';
        } else if (yieldRegions.hasOwnProperty('PagesApp')) {
            nextTemplateName = 'app';
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

        // Compare previous template with next template, then set Bender animation
        if(nextTemplateName === previousTemplateName) {
            // no animation yet
        } else if(nextTemplateName === 'modal') {
            Bender.animate('slideOverUp', addClass, removeClass);
        } else if(nextTemplateName === 'app') {
            Bender.animate('slideOverUpClose', addClass, removeClass);
        }

        this.next();
        previousTemplateName = nextTemplateName;
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
