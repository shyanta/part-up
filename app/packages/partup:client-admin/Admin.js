Template.Admin.onCreated(function() {
    var self = this;

    self.users = new ReactiveVar([]);
    self.partupstats = new ReactiveVar([]);
    self.userstats = new ReactiveVar([]);

    self.refresh = function() {
        Meteor.call('users.admin_all', function(error, results) {
            self.users.set(results);
        });
        Meteor.call('users.admin_stats', function(error, results) {
            self.userstats.set(results);
        });
        Meteor.call('partups.admin_all', function(error, results) {
            self.partupstats.set(results);
        });
    }

    self.refresh();
});

Template.Admin.helpers({
    users: function() {
        var users = Template.instance().users.get();
        return users;
    },
    userCount: function() {
        var users = Template.instance().users.get();
        if (users) {
            return users.length;
        } else {
            return '';
        }
    },
    userStats: function() {
        return Template.instance().userstats.get();
    },
    partupStats: function() {
        return Template.instance().partupstats.get();
    },
    getMail: function(user) {
        return User(user).getEmail();
    },
    isUserActive: function(user) {
        return User(user).isActive();
    }
});

Template.Admin.events({
    'click [data-deactivate-user]': function(event, template) {
        var userId = this._id;
        var self = this;

        Partup.client.prompt.confirm({
            onConfirm: function() {
                Meteor.call('users.deactivate', userId, function(error, result) {
                    if (error) {
                        Partup.client.notify.error(__(error));
                        return;
                    }
                    Partup.client.notify.success('user deactivated');
                });
            }
        });
    },
    'click [data-reactivate-user]': function(event, template) {
        var userId = this._id;

        Partup.client.prompt.confirm({
            onConfirm: function() {
                Meteor.call('users.reactivate', userId, function(error, result) {
                    if (error) {
                        Partup.client.notify.error(__(error));
                        return;
                    }
                    Partup.client.notify.success('user reactivated');
                });
            }
        });
    }
});
