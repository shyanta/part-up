/*************************************************************/
/* Layout helpers */
/*************************************************************/
Template.LayoutsMain.helpers({
    
    popupOpen: function(){
        return Session.get('main.popup-open');
    }
    
});


/*************************************************************/
/* Layout events */
/*************************************************************/
Template.LayoutsMain.events({
    
    'click [data-close-popup]': function closePopup(event, template){
        var overlay = $('[data-close-popup]'),
            clickedElement = $(event.target);

        // close popup if overlay is clicked
        if(clickedElement[0] === overlay[0]) Session.set('main.popup-open', false);
    }
    
});

/*************************************************************/
/* Layout rendered */
/*************************************************************/
Template.LayoutsMain.onRendered(function() {
    Bender.initialize(this.find('.pu-main'));
});