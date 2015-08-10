Template.Admin.onCreated(function() {
    this.subscribe('users.admin_all');
});

Template.Admin.helpers({
    users: function() {
        return Meteor.users.find({});
    },
    userCount: function() {
        return Meteor.users.find({}).count();
    },
    getMail: function(user) {
        return User(user).getEmail();
    }
});
