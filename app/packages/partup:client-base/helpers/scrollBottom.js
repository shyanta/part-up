Meteor.startup(function(){
    var windowScrollChecker = function windowScrollChecker(event){
        if (!document.body) return;

        var windowHeight = window.innerHeight,
            windowScrollY = window.scrollY,
            bodyScrollHeight = document.body.scrollHeight,
            bottomOffset = (bodyScrollHeight - (windowHeight + windowScrollY));

        Session.set('window.scrollBottomOffset', bottomOffset);
        // Router does not pass an event, that way we can assume it's the initial call
        if (event){
            // check if the page is scrolled down
            if ((windowHeight + windowScrollY) >= bodyScrollHeight) {
                Session.set('window.scrollBottom', true);
                $('body').addClass('pu-scrollbottom');
            } else {
                Session.set('window.scrollBottom', false);
                $('body').removeClass('pu-scrollbottom');
            }

        // when Router onAfterAction is called, check if document can
        // be scrolled and set default values accordingly
        } else {
            if (document.body.offsetHeight < windowHeight){
                Session.set('window.scrollBottom', false);
                $('body').removeClass('pu-scrollbottom');
            } else {
                Session.set('window.scrollBottom', true);
                $('body').addClass('pu-scrollbottom');
            }
        }
    };

    // Nasty document height change listener
    var onDocumentHeightChange = function onDocumentHeightChange(callback){
        if (!document.body) return;

        // init vars
        var lastHeight = document.body.clientHeight,
            newHeight,
            timer;

        // height checker loop :(
        var check = function check(){

            // set new height
            newHeight = document.body.scrollHeight;

            // call the callback function when the document height has changed
            if ( lastHeight != newHeight ){
                callback({type:"documentHeightChange"});
            }

            // remember the new height
            lastHeight = newHeight;

            // wait 200 ms and start over
            timer = setTimeout(check, 200);
        };

        // init
        check();
    }

    // when the page height changes, we want to check if we are at scrollbottom
    onDocumentHeightChange(windowScrollChecker);

    // on window scroll, check if scrollbottom
    jQuery(window).on('scroll', windowScrollChecker);

    // when route is changed, initialize
    Router.onAfterAction(windowScrollChecker);
});

Template.registerHelper('windowScrollBottom', function() {
    return Session.get('window.scrollBottom');
});
Template.registerHelper('windowScrollBottomOffset', function() {
    return Session.get('window.scrollBottomOffset');
});
