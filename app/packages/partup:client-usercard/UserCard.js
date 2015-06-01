Meteor.startup(function () {
    // remember the timeout id
    var showProfileTimeout;

    $('body').on('mouseover', '[data-usercard]', function(e){
        var self = $(this); // [data-usercard]

        // clear any other usercard timeout
        Meteor.clearTimeout(showProfileTimeout);

        // hide usercard
        var mouseLeaveHandler = function(e){
            self.off('mouseleave', mouseLeaveHandler);
            Session.set('partup.hover-card.settings', false);
            Session.set('partup.hover-card.data', false);
            Meteor.clearTimeout(showProfileTimeout);
        };

        // show usercard by setting the required settings
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
        };

        // immediatly set the usercard data for quick rendering
        Session.set('partup.hover-card.data', self.data('usercard'));

        // show usercard after 500 ms delay
        showProfileTimeout = Meteor.setTimeout(mouseOverHandler, 500);

        // listen to hover cancel
        self.on('mouseleave', mouseLeaveHandler);
    });
});

Template.UserCard.helpers({
    cardOpen: function(){
        // if there are settings, that means the card must be visible
        return Session.get('partup.hover-card.settings') ? true : false;
    },
    settings: function(){
        // get usercard settings
        var settings = Session.get('partup.hover-card.settings');
        if(!settings) return {};

        // check if it's below the middle of the screen
        var positionTop = (100 / settings.windowHeight * settings.y) > 50 ? true : false;

        // calculate top and left styling
        return {
            top: function(){
                if(positionTop){
                    var bottom = settings.windowHeight - settings.y;
                    return 'bottom:' + bottom + 'px;';
                } else {
                    var top = settings.y + settings.height;
                    return 'top:' + top + 'px;';
                }
            },
            left: function(){
                var left = settings.x + (settings.width / 2);
                return 'left:' + left + 'px;';
            },
            positionTop: positionTop
        };
    },
    data: function(){
        return Session.get('partup.hover-card.data');
    }
});
