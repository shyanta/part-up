Template.body.onRendered(function(){
    // remember the timeout id
    var showProfileTimeout;

    $('body').on('mouseover', '[data-hovercard]', function(e){
        var self = $(this); // [data-hovercard]

        // clear any other hovercard timeout
        Meteor.clearTimeout(showProfileTimeout);

        // hide hovercard
        var mouseLeaveHandler = function(e){
            self.off('mouseleave', mouseLeaveHandler);
            Session.set('partup.hover-card.settings', false);
            Session.set('partup.hover-card.data', false);
            Meteor.clearTimeout(showProfileTimeout);
        };

        // show hovercard by setting the required settings
        var mouseOverHandler = function(e){
            var offset = self.offset();
            var posY = offset.top - $(window).scrollTop();
            var posX = offset.left - $(window).scrollLeft(); 
            Session.set('partup.hover-card.settings', {
                x: posX,
                y: posY,
                width: self[0].offsetWidth,
                height: self[0].offsetHeight,
                windowHeight: window.innerHeight
            });
        }

        // immediatly set the hovercard data for quick rendering
        Session.set('partup.hover-card.data', self.data('hovercard'));

        // show hovercard after 500 ms delay
        showProfileTimeout = Meteor.setTimeout(mouseOverHandler, 500);

        // listen to hover cancel
        self.on('mouseleave', mouseLeaveHandler);
    });
});