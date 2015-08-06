// jscs:disable
/**
 * Render a user card
 *
 * You can pass the widget a few options which enable various functionalities
 *
 * @module client-usercard
 */
// jscs:enable
var hoverCardDebugger;

Template.UserHoverCard.onCreated(function() {
    hoverCardDebugger = new Partup.client.Debugger({
        enabled: false,
        namespace: 'hovercard'
    });

    hoverCardDebugger.log('created');
    var template = this;
    template.hoverCardSettings = new ReactiveDict();
});

Template.UserHoverCard.onRendered(function() {
    hoverCardDebugger.log('rendered');
    var template = this;
    // remember the timeout id
    var showProfileTimeout;

    $('body').on('mouseover', '[data-usercard]', function(e) {
        hoverCardDebugger.log('mouseover');
        var self = $(this); // [data-usercard]

        // clear any other usercard timeout
        clearTimeout(showProfileTimeout);

        // hide usercard
        var mouseLeaveHandler = function(e) {
            hoverCardDebugger.log('mouseleave');
            self.off('mouseleave', mouseLeaveHandler);
            var s = template.hoverCardSettings.get('partup.hover-card.settings');
            var d = template.hoverCardSettings.get('partup.hover-card.data');
            if (s) template.hoverCardSettings.set('partup.hover-card.settings', false);
            if (d) template.hoverCardSettings.set('partup.hover-card.data', false);
            clearTimeout(showProfileTimeout);
        };

        // show usercard by setting the required settings
        var delayedMouseOverHandler = function(e) {
            hoverCardDebugger.log('showing hovercard');
            var offset = self.offset();
            var posY = offset.top - $(window).scrollTop();
            var posX = offset.left - $(window).scrollLeft();
            template.hoverCardSettings.set('partup.hover-card.settings', {
                x: posX,
                y: posY,
                width: self[0].offsetWidth,
                height: self[0].offsetHeight,
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth
            });
        };

        // immediatly set the usercard data for quick rendering
        template.hoverCardSettings.set('partup.hover-card.data', self.data('usercard'));

        // show usercard after 500 ms delay
        showProfileTimeout = setTimeout(delayedMouseOverHandler, 500);

        // listen to hover cancel
        self.on('mouseleave', mouseLeaveHandler);
    });

    $('body').on('click', '[data-usercard]', function(e) {
        hoverCardDebugger.log('clicked');
        var self = $(this);
        var s = template.hoverCardSettings.get('partup.hover-card.settings');
        var d = template.hoverCardSettings.get('partup.hover-card.data');
        if (s) template.hoverCardSettings.set('partup.hover-card.settings', false);
        if (d) template.hoverCardSettings.set('partup.hover-card.data', false);

        if (e.target.tagName.toLowerCase() === 'a') {
            e.target.href = Router.path('profile-upper-partups', {_id: self.data('usercard')});
        } else {
            Router.go('profile-upper-partups', {_id: self.data('usercard')});
        }
    });
});

Template.UserHoverCard.helpers({
    activeClass: function() {
        // if there are settings, that means the card must be visible
        return Template.instance().hoverCardSettings.get('partup.hover-card.settings') ? 'pu-hovercard-active' : '';
    },
    settings: function() {
        // get usercard settings
        var settings = Template.instance().hoverCardSettings.get('partup.hover-card.settings');
        if (!settings) return {};

        // check if it's below the middle of the screen
        var positionTop = (100 / settings.windowHeight * settings.y) > 50 ? true : false;
        var verticalPositionClass = positionTop ? 'pu-hovercard-position-top' : 'pu-hovercard-position-bottom';
        var positionLeft = (100 / settings.windowWidth * settings.x) < 50 ? true : false;
        var horizontalPositionClass = positionLeft ? 'pu-hovercard-position-left' : 'pu-hovercard-position-right';

        // calculate top and left styling
        return {
            top: function() {
                if (positionTop) {
                    var bottom = settings.windowHeight - settings.y;
                    return 'bottom:' + bottom + 'px;';
                } else {
                    var top = settings.y + settings.height;
                    return 'top:' + top + 'px;';
                }
            },
            left: function() {
                var left = settings.x + (settings.width / 2);
                return 'left:' + left + 'px;';
            },

            verticalPositionClass: verticalPositionClass,
            horizontalPositionClass: horizontalPositionClass
        };
    },
    data: function() {
        return Template.instance().hoverCardSettings.get('partup.hover-card.data');
    }
});
