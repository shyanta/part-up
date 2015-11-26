Template.UserCardListContent.onCreated(function() {
    if (typeof this.data.data.list == 'array') {
        this.subscribe('users.by_ids', this.data.data.list);
    }
});
Template.UserCardListContent.helpers({
    users: function() {
        var list = Template.currentData().list;
        var users = Meteor.users.find({_id: {$in: this.data.list}}, {limit: 5, sort: {'status.online': -1}}).fetch();
        if (!users.length) return;

        users.forEach(function(user) {
            user.participation_score = User(user).getReadableScore();

            if (!user.upperOf) user.upperOf = [];
            if (!user.supporterOf) user.supporterOf = [];
            return user;
        });

        return users;
    },
    showCount: function() {
        var count = Meteor.users.find({_id: {$in: this.data.list}}).count();
        return count > 5;
    },
    additional: function() {
        return Meteor.users.find({_id: {$in: this.data.list}}).count() - 5;
    }
});
