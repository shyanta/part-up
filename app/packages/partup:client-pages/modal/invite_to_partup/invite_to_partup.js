Template.modal_invite_to_partup.onCreated(function() {
    var self = this;
    self.userIds = new ReactiveVar([]);
    self.subscription = new ReactiveVar();

    Meteor.call('activities.user_suggestions', this.data.activityId, function(error, userIds) {
        if (error) {
            return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
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
    },
    completeness: function() {
        return this.completeness || 0;
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
    },
    'click [data-invite-id]': function(event, template) {
        var activityId = template.data.activityId;
        var userId = event.target.dataset.inviteId;

        Meteor.call('activities.invite_existing_upper', activityId, userId, function(error) {
            if (error) {
                return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
            }

            Partup.client.notify.success(__('pages-modal-invite_to_partup-invite-success'));
        });
    }
});
