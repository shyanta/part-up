Template.modal_admin.onCreated(function() {
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

Template.modal_admin.helpers({
    users: function() {
        return Template.instance().users.get();
    },
    userCount: function() {
        return Template.instance().users.get().length;
    },
    partupStats: function() {
        return Template.instance().partupstats.get();
    },
    getMail: function(user) {
        return User(user).getEmail();
    }
});
