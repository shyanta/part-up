Template.modal_invite_to_partup.onCreated(function() {
    var self = this;
    self.userIds = new ReactiveVar([]);
    self.subscription = new ReactiveVar();

    Meteor.call('activities.user_suggestions', this.data.activityId, function(err, userIds) {
        if (err) {
            Partup.client.notify.error(err.reason);
            return;
        }

        self.userIds.set(userIds);
        self.subscription.set(self.subscribe('users.by_ids', userIds));
    });
});

Template.modal_invite_to_partup.helpers({
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

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_invite_to_partup.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        Intent.return('partup-invite', {
            fallback_route: {
                name: 'partup',
                params: {
                    _id: template.data.partupId
                }
            }
        });
    }
});
