var _now = new ReactiveVar(new Date());
Meteor.setInterval(function() {
    _now.set(new Date());
}, 500);

/**
 * Current date (reactive)
 *
 * @memberOf Partup.client
 */
Partup.client.reactiveDate = function() {
    return _now.get();
};
