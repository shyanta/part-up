/**
 * The Discover page
 * Offers the query reactive-var to be used to pass
 * from the header to the page content
 *
 */

/**
 * Discover created
 */
Template.app_discover.onCreated(function() {
    this.query = new ReactiveVar();
});

/**
 * Discover helpers
 */
Template.app_discover.helpers({
    query: function() {
        return Template.instance().query;
    },
    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    },
});
