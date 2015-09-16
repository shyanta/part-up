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
    this.getting_data = new ReactiveVar();
});

/**
 * Discover helpers
 */
Template.app_discover.helpers({
    getting_data: function() {
        return Template.instance().getting_data;
    },
    query: function() {
        return Template.instance().query;
    },
    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    }
});
