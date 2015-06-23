/**
 * Debug namespace
 * @name debug
 */
Partup.client.debug = {

    currentSubscriptions: function() {
        var subs = Meteor.default_connection._subscriptions;
        Object.keys(subs).forEach(function(key) {
            console.log(subs[key]);
        });
    }

};
