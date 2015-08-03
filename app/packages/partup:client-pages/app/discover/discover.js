/**
 * The Discover page
 * Offers the query reactive-var to be used to pass
 * the partups query options from the header to the page content
 *
 */
/**
 * Discover created
 */
Template.app_discover.onCreated(function() {
    this.query = new ReactiveVar(Partup.client.discover.DEFAULT_QUERY);
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
