Template.InviteTile.onCreated(function() {
    var template = this;
    template.inviting = new ReactiveVar(false);
    template.loading = new ReactiveVar(true);
    template.subscribe('users.one', template.data.userId, {
        onReady: function() {
            template.loading.set(false);
        }
    });
    template.inviteType = new ReactiveVar('partup-invite');

    if (template.data.partupId) template.inviteType.set('partup-invite');
    if (template.data.partupId && template.data.activityId) template.inviteType.set('partup-activity-invite');
    if (template.data.networkSlug) template.inviteType.set('network-invite');
    template.searchQuery = new ReactiveVar(false);
    template.autorun(function() {
        var data = Template.currentData();
        template.searchQuery.set(data.highlight);
    });
});

Template.InviteTile.helpers({
    data: function() {
        var self = this;
        var template = Template.instance();
        var data = Template.currentData();
        var user = Meteor.users.findOne({_id: template.data.userId});
        var currentUser = Meteor.user();
        var tags = user.profile.tags || [];
        return {
            user: function() {
                return user;
            },
            participationScore: function() {
                return User(user).getReadableScore();
            },
            highlightText: function() {
                var text = template.searchQuery.get();
                var highlight = Partup.client.sanitize(text);
                var description = user.profile.description || '';
                var text = description.length ? description.split(highlight).join('<span>' + highlight + '</span>') : '';
                return text;
            },
            highlightTag: function() {
                var text = template.searchQuery.get();
                var highlightTag = tags.indexOf(text);
                return tags[highlightTag];
            },
            relevance: function() {
                var userPartups = user.upperOf || [];
                var userSupporter = user.supporterOf || [];
                var userNetworks = user.networks || [];
                var currentUserPartups = currentUser.upperOf || [];
                var currentUserNetworks = currentUser.networks || [];
                return {
                    partnerInSamePartupsCount: function() {
                        return _.intersection(userPartups, currentUserPartups).length;
                    },
                    memberOfSameNetworkCount: function() {
                        return _.intersection(userNetworks, currentUserNetworks).length;
                    },
                    supporterOfPartupsCurrentUserIsPartnerOfCount: function() {
                        return _.intersection(userSupporter, currentUserPartups).length;
                    }
                };
            }
        };
    },
    state: function() {
        var template = Template.instance();
        var partup = Partups.findOne(template.data.partupId);
        var network = Networks.findOne({slug: template.data.networkSlug});
        var user = Meteor.users.findOne({_id: template.data.userId});
        return {
            inviteSent: function() {
                if (partup) return partup.hasInvitedUpper(user._id);
                if (network) return network.isUpperInvited(user._id);
                return false;
            },
            alreadyPartner: function() {
                if (partup) return User(user).isPartnerInPartup(partup._id);
                if (network) return network.hasMember(user._id);
                return false;
            },
            inviteLoadingForUser: function() {
                return template.inviting.get();
            },
            loading: function() {
                return template.loading.get();
            },
            inviteButtonType: function() {
                return 'data-' + template.inviteType.get();
            }
        };
    }
});

Template.InviteTile.events({
    'click [data-partup-invite]': function(event, template) {
        var partupId = template.data.partupId;
        var partup = Partups.findOne(partupId);
        var invitingUserId = template.data.userId;
        var invitingUser = Meteor.users.findOne({_id: invitingUserId});

        if (User(invitingUser).isPartnerInPartup(partupId) || partup.hasInvitedUpper(invitingUserId)) return;

        template.inviting.set(true);

        Meteor.call('partups.invite_existing_upper', partupId, invitingUserId, function(err) {
            template.inviting.set(false);

            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
        });
    },

    'click [data-partup-activity-invite]': function(event, template) {
        var activityId = template.data.activityId;
        var activity = Activities.findOne(activityId);
        var invitingUserId = template.data.userId;
        var invitingUser = Meteor.users.findOne({_id: invitingUserId});

        if (User(invitingUser).isPartnerInPartup(template.data.partupId) || activity.isUpperInvited(invitingUserId)) return;

        template.inviting.set(true);
        Meteor.call('activities.invite_existing_upper', activityId, invitingUserId, function(err) {
            template.inviting.set(false);

            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
        });
    },

    'click [data-network-invite]': function(event, template) {
       var invitingUserId = template.data.userId;
        var network = Networks.findOne({slug: template.data.networkSlug});

        if (network.hasMember(invitingUserId) || network.isUpperInvited(invitingUserId)) return;

        template.inviting.set(true);
        Meteor.call('networks.invite_existing_upper', network._id, invitingUserId, function(err) {
            template.inviting.set(false);

            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
        });
    }
});
