Template.Admin.onCreated(function() {
    var self = this;

    self.users = new ReactiveVar([]);
    self.partupstats = new ReactiveVar([]);

    Meteor.call('users.admin_all', function(error, results) {
        self.users.set(results);
    });
    Meteor.call('partups.admin_all', function(error, results) {
        self.partupstats.set(results);
    });
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
    partupStats: function() {
        return Template.instance().partupstats.get();
    },
    getMail: function(user) {
        return User(user).getEmail();
    }
});
