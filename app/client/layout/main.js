/*************************************************************/
/* main rendered */
/*************************************************************/
Template.main.onRendered(function() {
    $('head').append('<link rel="stylesheet" href="/css/highlight.js-github.min.css">');
    $('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.3/js.cookie.min.js"></script>');
    $('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/dropbox.js/2.5.0/Dropbox-sdk.min.js"></script>');
    $('head').append('<script src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="le3ovpnhqs4qy9g"></script>');
    try {
        var mainContainer = this.find('.pu-main');
        if (!mainContainer) throw 'Could not find ".pu-main" element to initialize Bender with.';

        Bender.initialize(mainContainer);
    } catch (e) {
        return e;
    }
});

Template.main.helpers({
    noPopupActive: function() {
        return !Partup.client.popup.current.get();
    }
});

Meteor.startup(function() {
    Partup.client.scroll.init();
    Partup.client.screen.init();
});