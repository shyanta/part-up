Template.onCreated(function() {
    this.subscribe('users.admin_all');
});

Template.modal_admin.helpers({
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

Template.modal_network_settings.events({
});
