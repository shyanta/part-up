/*************************************************************/
/* app rendered */
/*************************************************************/
Template.app.onRendered(function() {
    var $body = $('body');
    $body.removeClass('pu-state-currentlayout-modal');
    $body.addClass('pu-state-currentlayout-app');
});
