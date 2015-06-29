/**
 * Package that contains all of the pages corresponding to app routes
 *
 * @module client-pages
 */

/*************************************************************/
/* app rendered */
/*************************************************************/
Template.app.onRendered(function() {
    var $body = $('body');
    $body.removeClass('pu-state-currentlayout-modal');
    $body.addClass('pu-state-currentlayout-app');
});
