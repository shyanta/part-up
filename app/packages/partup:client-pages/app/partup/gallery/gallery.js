Template.ImageGallery.helpers({
    popupId: function() {
        console.log(this)
        return this.updateId + '_gallery';
    }
});

Template.ImageGallery.events({
    'click [data-open-gallery]': function(event, template) {
        var popupId = $(event.currentTarget).data('open-gallery');
        var imageId = $(event.target).closest('[data-image]').data('image');

        Partup.client.popup.open(popupId);

    }
});
