/*************************************************************/
/* modal on rendered */
/*************************************************************/
Template.modal.onRendered(function() {
    var $body = $('body');
    $body.removeClass('pu-state-currentlayout-app');
    $body.addClass('pu-state-currentlayout-modal');
});

/*************************************************************/
/* modal helpers */
/*************************************************************/
Template.modal.helpers({
    focusLayerEnabled: function helperFocusLayerEnabled () {
        return Partup.ui.focuslayer.state.get();
    }
});

/*************************************************************/
/* modal events */
/*************************************************************/
Template.modal.events({

    'click [data-focuslayer]': function eventsClickFocuslayer () {
        Partup.ui.focuslayer.disable();
    }

});
