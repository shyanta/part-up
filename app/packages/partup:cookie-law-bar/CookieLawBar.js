if (Meteor.isClient) {
    Template.CookieLawBar.onRendered(function () {
        var $cookiebar = jQuery('#cookie-bar');
        var $intercomLauncher = jQuery('#intercom-launcher');

        if (Cookies.get('cb-enabled') && Cookies.get('cb-enabled') === 'enabled') {
            $cookiebar.hide();
        } else {
            $cookiebar.show();
        }

        waitUntil(function(){
            return (jQuery('#intercom-launcher').is(':visible') && jQuery('#cookie-bar').is(':visible'));
        }, function(){
            jQuery('#intercom-launcher').css({ bottom: 80 });
        }, function(){

        });

    });
    Template.CookieLawBar.events({
        'click .cb-enable': function (event) {
            var $cookiebar = jQuery(event.currentTarget).parent();
            Cookies.set('cb-enabled', 'enabled', { expires: Infinity });
            $cookiebar.hide();
            jQuery('#intercom-launcher').css({ bottom: 20 });
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
