if (Meteor.isClient) {
    Template.CookieLawBar.onRendered(function () {
        var $cookiebar = jQuery('#cookie-bar');
        var $intercomLauncher = jQuery('#intercom-launcher');

        if (Cookie.get('cb-enabled') && Cookie.get('cb-enabled') === 'enabled') {
            $cookiebar.remove();
        } else {
            $cookiebar.show();
        }

        waitUntil(function(){
            return (jQuery('#intercom-launcher').length > 0 || jQuery('#intercom-launcher').is(':visible')) &&
                (Cookie.get('cb-enabled') === 'enabled' ||  jQuery('#cookie-bar').length > 0);
        }, function(){
            jQuery('#intercom-launcher').css({ bottom: 80 });
        }, function(){

        });

    });
    Template.CookieLawBar.events({
        'click .cb-enable': function (event) {
            var $cookiebar = jQuery(event.currentTarget).parent();
            Cookie.set('cb-enabled', 'enabled');
            $cookiebar.slideUp('fast', function() {
                jQuery('#intercom-launcher').css({ bottom: 20 });
            });
            event.preventDefault();
        }
    })
}

/**
 acceptButton: true,

 acceptText: 'I Understand',

 declineButton: false,

 declineText: 'Disable Cookies',

 policyButton: true,

 policyText: 'Privacy Policy',

 policyURL: '/privacy-policy/',

 autoEnable: true,

 acceptOnContinue: false,

 expireDays: 365,

 forceShow: false,

 effect: 'slide',

 element: 'body',

 append: false,

 fixed: false,

 bottom: false,

 zindex: '',

 redirect: '/',

 domain: 'www.example.com',

 referrer: 'www.example.com'`# meteor-jquery-cookiebar
 */