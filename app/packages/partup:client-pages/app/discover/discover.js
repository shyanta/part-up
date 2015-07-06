/**
 * The Discover page
 * Offers the partupsOptions reactive-var to be used to pass
 * the partups query options from the header to the page content
 *
 */

/**
 * Discover created
 */
Template.app_discover.onCreated(function() {
    this.partups_options = new ReactiveVar();
});

/**
 * Discover helpers
 */
Template.app_discover.helpers({
    partupsOptions: function() {
        return Template.instance().partups_options;
    }
});
