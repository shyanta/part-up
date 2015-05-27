Template.registerHelper('partupPopupActive', function(name){
    return name === Session.get('partup.popup-active');
});

Meteor.startup(function () {
    $('body').on('click', '[data-popup]', function(e){
        console.log(e, 'click');
        var popupId = $(this).data('popup');
        Partup.ui.popup.open();
        Session.set('partup.popup-active', popupId);
    });
});

Template.WidgetPopup.helpers({
    popupOpen: function(){
        return Session.get('main.popup-open');
    }
});

Template.WidgetPopup.events({
    'click [data-close]': function closePopup(event, template){
        Partup.ui.popup.close();
    },
    'click [data-close-popup]': function closePopup(event, template){
        var overlay = $('[data-close-popup]'),
            clickedElement = $(event.target);

        // close popup if overlay is clicked
        if(clickedElement[0] === overlay[0]) Session.set('main.popup-open', false);
    }
});