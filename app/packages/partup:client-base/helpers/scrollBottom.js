Meteor.startup(function(){
    var windowScrollChecker = function windowScrollChecker(event){
        // Router does not pass an event, that way we can assume it's the initial call
        if(event){
            // check if the page is scrolled down
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                Session.set('window.scrollBottom', true);
            } else {
                Session.set('window.scrollBottom', false);
            }

        // when Router onAfterAction is called, check if document can 
        // be scrolled and set default values accordingly
        } else {
            if(document.body.offsetHeight < window.innerHeight){
                Session.set('window.scrollBottom', false);
            } else {
                Session.set('window.scrollBottom', true);

            }
        }
    };

    // Nasty document height change listener
    var onDocumentHeightChange = function onDocumentHeightChange(callback){

        // init vars
        var lastHeight = document.body.clientHeight, 
            newHeight, 
            timer;

        // height checker loop :(
        var check = function check(){

            // set new height
            newHeight = document.body.scrollHeight;

            // call the callback function when the document height has changed
            if( lastHeight != newHeight ){
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
    // $(window).on('click',windowScrollChecker);
    $(window).on('scroll',windowScrollChecker);

    // when route is changed, initialize
    Router.onAfterAction(windowScrollChecker);
});

Template.registerHelper('windowScrollBottom', function() {
    return Session.get('window.scrollBottom');
});
