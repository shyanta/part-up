Template.modal_network_invite.onCreated(function() {
    var self = this;
    self.userIds = new ReactiveVar([]);
    self.subscription = new ReactiveVar();

    Meteor.call('networks.user_suggestions', this.data.networkId, function(err, userIds) {
        if (err) {
            Partup.client.notify.error(err.reason);
            return;
        }

        self.userIds.set(userIds);
        self.subscription.set(self.subscribe('users.by_ids', userIds));
    });
});

Template.modal_network_invite.helpers({
    suggestions: function() {
        var sub = Template.instance().subscription.get();
        if (!sub || !sub.ready()) return;

        var suggestions = [];
        var userIds = Template.instance().userIds.get();
        for (var i = 0; i < userIds.length; i++) {
            suggestions.push(Meteor.users.findOne({_id: userIds[i]}));
        }

        return suggestions;
    }
});
