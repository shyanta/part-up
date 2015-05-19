Template.body.onRendered(function(){
    var showProfileTimeout;
    $('body').on('mouseover', '[data-hovercard]', function(e){
        var self = $(this);
        clearTimeout(showProfileTimeout);

        var mouseLeaveHandler = function(e){
            self.off('mouseleave', mouseLeaveHandler);
            Session.set('partup.hover-card.settings', false);
            clearTimeout(showProfileTimeout);
        };

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
        
        Session.set('partup.hover-card.data', self.data('hovercard'));

        showProfileTimeout = setTimeout(mouseOverHandler, 500);
        self.on('mouseleave', mouseLeaveHandler);
    });
});