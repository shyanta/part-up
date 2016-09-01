Template.ReversedScroller.onRendered(function() {
    var template = this;

    template.handleScroll = function(event) {
        event.preventDefault();
        if (event.originalEvent.deltaY) {
            $(event.currentTarget)[0].scrollTop -= event.originalEvent.deltaY;
        } else {
            var delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
            if ($(this).scrollTop() >= 0) {
                $(this).scrollTop($(this)[0].scrollTop + delta);
            }
        }
        if (template.data.onScroll) template.data.onScroll();
        return false;
    };

    template.$('[data-pu-reversed-scroller]').on('mousewheel DOMMouseScroll MozMousePixelScroll', template.handleScroll);
});

Template.ReversedScroller.onDestroyed(function() {
    var template = this;
    template.$('[data-pu-reversed-scroller]').off('mousewheel DOMMouseScroll MozMousePixelScroll', template.handleScroll);
});
