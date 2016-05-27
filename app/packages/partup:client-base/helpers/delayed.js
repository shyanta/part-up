var _chat_timekeeper = new ReactiveDict();
Template.registerHelper('chatTimeoutHasPassed', function(uniqueId, timeout) {
    var alreadyFired = _chat_timekeeper.get('chattimeout_' + uniqueId);
    if (!alreadyFired) {
        Meteor.setTimeout(function() {
            _chat_timekeeper.set('chattimeout_' + uniqueId, true);
        }, timeout);
    }
    return _chat_timekeeper.get('chattimeout_' + uniqueId);
});

Partup.client.chat = {
    destroy: function() {
        _chat_timekeeper.clear();
    }
};
