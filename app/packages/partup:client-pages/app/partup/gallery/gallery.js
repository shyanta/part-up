Template.ImageGallery.onCreated(function() {
    var template = this;

    template.setNewCurrent = function(relativePos) {
        var pictures = template.data.pictures;
        var current = template.data.current;
        var newCurrent = current + relativePos;

        if (relativePos > 0 && newCurrent > pictures.length - 1) {
            newCurrent = 0;
        } else if (relativePos < 0 && newCurrent < 0) {
            newCurrent = pictures.length - 1;
        } else if (newCurrent < 0 || newCurrent > pictures.length - 1) {
            newCurrent = 0;
        }

        template.data.setter(newCurrent);
    };
});
Template.ImageGallery.helpers({
    popupId: function() {
        return this.updateId + '_gallery';
    }
});

Template.ImageGallery.events({
    'click [data-open-gallery]': function(event, template) {
        var popupId = $(event.currentTarget).data('open-gallery');
        var imageId = $(event.target).closest('[data-image]').data('image');

        Partup.client.popup.open({
            id: popupId,
            type: 'gallery'
        });

    },
    'click [data-previous]': function eventsClickNext (event, template) {
        event.preventDefault();
        template.setNewCurrent(-1);
        if (template.focuspoint) template.focuspoint.reset();
    },

    'click [data-next]': function eventsClickNext (event, template) {
        event.preventDefault();
        template.setNewCurrent(1);
        if (template.focuspoint) template.focuspoint.reset();
    }
});
