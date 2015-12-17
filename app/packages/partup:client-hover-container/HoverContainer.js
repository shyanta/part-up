// jscs:disable
/**
 * Render a generic hover card
 *
 * @module client-hovercontainer
 */
// jscs:enable

var position = new ReactiveVar({});
var tile = new ReactiveDict();

var showTimeout;

var hide = function($trigger) {
    if ($trigger) $trigger.off('mouseleave', hide);

    // Unset settings and user
    position.set({});
    tile.set('template', undefined);
    tile.set('data', undefined);

    clearTimeout(showTimeout);
};

var show = function(event) {
    var $trigger = $(this);

    // Gather data for tile
    var tileTemplate = $trigger.data('hovercontainer') || '';
    var tileData = $trigger.data('hovercontainer-context') || {};
    var delay = parseInt($trigger.data('hovercontainer-delay')) || 500;

    // Clear any other hovercontainer timeout
    clearTimeout(showTimeout);

    // Show the card
    var delayedShow = function() {
        var pos = {};

        var OFFSET = 5;
        var screenWidth = Partup.client.screen.size.get('width');
        var screenHeight = Partup.client.screen.size.get('height');
        var elOffset = $trigger.offset();
        var originX = elOffset.left - $(window).scrollLeft();
        var originY = elOffset.top - $(window).scrollTop();
        var elWidth = $trigger.outerWidth();
        var elHeight = $trigger.outerHeight();

        pos.leftSide = (100 / screenWidth * originX) < 50;
        pos.topHalf = (100 / screenHeight * originY) > 50;
        pos.coords = {
            left: elWidth / 2 + originX
        };

        if (pos.topHalf) {
            pos.coords.bottom = screenHeight - originY + OFFSET;
        } else {
            pos.coords.top = originY + elHeight + OFFSET;
        }

        position.set(pos);
        tile.set('template', tileTemplate);
        tile.set('data', tileData);
    };

    // Show the card
    if (delay > 0) {
        showTimeout = setTimeout(delayedShow, delay);
    } else {
        delayedShow();
    }

    // Hide the card on mouse leave
    $trigger.on('mouseleave', function() {
        hide($trigger);
    });
};

Template.HoverContainer.onRendered(function() {
    $('body').on('mouseenter', '[data-hovercontainer]', show);
    Router.onBeforeAction(function() {
        hide();
        this.next();
    });
});

Template.HoverContainer.helpers({
    position: function() {
        return position.get();
    },
    tileTemplate: function() {
        return tile.get('template');
    },
    tileData: function() {
        return tile.get('data');
    }
});
