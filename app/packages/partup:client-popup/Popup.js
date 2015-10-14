// jscs:disable
/**
 * Renders the popup container, overlay and dismiss handlers
 *
 * @module client-popup
 * @param {contentFor} PopupTitle  the html content for the popup title
 * @param {contentFor} PopupContent  the html content for the popup content
 */
// jscs:enable
Template.Popup.onCreated(function() {
    var tpl = this;
    $('body').on('click', '[data-popup]', function(e) {
        e.preventDefault();
        try {
            var id = $(this).data('popup');
            Partup.client.popup.open(id);
        } catch (e) {
            return Partup.client.error('Global [data-popup] on click: ' + e);
        }
    });
});

Template.Popup.helpers({
    currentPopup: function() {
        return Partup.client.popup.current.get();
    },
    type: function() {
        return Partup.client.popup.currentType.get();
    },
    overflowing: function() {
        return Partup.client.popup.totalImages.get() > 1;
    },
    imageIndex: function() {
        return Partup.client.popup.imageIndex.get();
    }
});

Template.Popup.events({
    'click [data-overlay-dismiss]': function closePopup(event, template) {
        if (event.target !== event.currentTarget) return;

        try {
            Partup.client.popup.close();
        } catch (e) {
            return Partup.client.error('Popup [data-overlay-dismiss] on click: ' + e);
        }
    },
    'click [data-dismiss]': function closePopup(event, template) {
        var dismiss = $(event.currentTarget).data('dismiss');
        if (dismiss !== 'no-prevent') event.preventDefault();
        try {
            Partup.client.popup.close();
        } catch (e) {
            return Partup.client.error('Popup [data-dismiss] on click: ' + e);
        }
    },
    'click [data-left]': function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        var scroller = $('[data-scroller]');
        var newLeft = scroller.scrollLeft() - scroller.width();
        scroller.animate({scrollLeft: newLeft}, 500);
        template.left = newLeft;
    },
    'click [data-right]': function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        var scroller = $('[data-scroller]');
        var newLeft = scroller.scrollLeft() + scroller.width();
        scroller.animate({scrollLeft: newLeft}, 500);
    }
});
