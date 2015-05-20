Meteor.publish('users.count', function() {
    Counts.publish(this, 'users', Meteor.users.find());
});

Meteor.publish('users.one', function() {
    var self = this;

    return Meteor.users.find({ _id: self.userId }, { limit: 1, fields: { 'profile': 1, 'online.status': 1 } });
});

Meteor.publishComposite('users.loggedin', function() {
    var self = this;

    return {
        find: function() {
            return Meteor.users.find({ _id: self.userId }, { limit: 1, fields: { 'profile': 1, 'online.status': 1 } });
        },
        children: [
            {
                find: function(user) {
                    return Images.find({ _id: user.profile.image }, { limit: 1 });
                }
            }
        ]
    };
});
