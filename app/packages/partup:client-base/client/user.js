/**
 * Client user helpers
 *
 * @class user
 * @memberOf Partup.client
 */

Partup.client.user = {
    logout: function() {
        Intercom('shutdown');
        Meteor.logout();
    }
};
