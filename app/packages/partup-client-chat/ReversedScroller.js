Template.ReversedScroller.onRendered(function() {
    var template = this;

    template.handleScroll = function(event) {
        event.preventDefault();

        var $element = $(this);
        var elementScrollHeight = $element[0].scrollHeight;
        var elementScrollTop = $element[0].scrollTop;
        var elementOuterHeight = $element.outerHeight(true);

        // reversing scroll behaviour
        if (event.originalEvent.deltaY) {
            $element[0].scrollTop -= event.originalEvent.deltaY;
        } else {
            var delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
            if (elementScrollTop >= 0) $element.scrollTop(elementScrollTop + delta);
        }

        // custom scroll event for ReversedScroller.onScroll handlers
        var scrollEvent = {
            top: {
                offset: elementScrollHeight - elementOuterHeight - elementScrollTop,
                reached: elementScrollHeight - elementScrollTop === elementOuterHeight
            },
            bottom: {
                offset: elementScrollTop,
                reached: elementScrollTop <= 0,
            }
        };

        if (template.data.onScroll) template.data.onScroll(scrollEvent);

        return false;
    };

    template.$('[data-pu-reversed-scroller]').on('mousewheel DOMMouseScroll MozMousePixelScroll', template.handleScroll);
});

Template.ReversedScroller.onDestroyed(function() {
    var template = this;
    template.$('[data-pu-reversed-scroller]').off('mousewheel DOMMouseScroll MozMousePixelScroll', template.handleScroll);
});
