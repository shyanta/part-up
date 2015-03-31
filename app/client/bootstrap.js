Meteor.startup(function() {

    /*************************************************************/
    /* Language configuration */
    /*************************************************************/
    if(TAPi18n && Partup) {
        var language = TAPi18n.getLanguage() || 'en';
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
            Bender.animate('none', addClass, removeClass);
        } else if(nextTemplateName === 'modal') {
            Bender.animate('slideOverUp', addClass, removeClass);
        } else if(nextTemplateName === 'app') {
            Bender.animate('slideOverUpClose', addClass, removeClass);
        }
        
        this.next();
        previousTemplateName = nextTemplateName;
    });
    
});