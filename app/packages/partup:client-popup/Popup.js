// jscs:disable
/**
 * Renders the popup container, overlay and dismiss handlers
 *
 * @module client-popup
 * @param {contentFor} PopupTitle  the html content for the popup title
 * @param {contentFor} PopupContent  the html content for the popup content
 */
// jscs:enable
Meteor.startup(function() {
    $('body').on('click', '[data-popup]', function(e) {
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
        try {
            Partup.client.popup.close();
        } catch (e) {
            return Partup.client.error('Popup [data-dismiss] on click: ' + e);
        }
    }
});
