/**
 * Responsiver
 *
 * @class responsive
 * @memberof Partup.client
 */
Partup.client.responsive = {
    pages: [
    ],
    is: function() {
        return mout.array.contains(Partup.client.responsive.pages, Router.current().route.getName());
    }
};
