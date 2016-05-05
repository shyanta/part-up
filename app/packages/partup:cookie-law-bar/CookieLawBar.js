Template.CookieLawBar.onRendered(function() {

    jQuery.cookieBar({
        acceptText:  TAPi18n.__('cookie-accept-text'),
        policyText: TAPi18n.__('cookie-policy-text')
    });

    var $cookiebar = jQuery('#cookie-bar');
    var $cookiebarButton = $cookiebar.find('.cb-enable');

    $cookiebarButton.parent().after($cookiebarButton);

    var $moreInfoText = '<a  class="more-info" target="_blank" href="'+TAPi18n.__('cookie-more-info-url')+'">'+TAPi18n.__('cookie-more-info')+'</a>';

    $cookiebar.find('p').html(TAPi18n.__('cookie-policy-text'));
    $cookiebar.find('p').append($moreInfoText);

});
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