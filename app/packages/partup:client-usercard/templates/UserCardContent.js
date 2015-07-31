Template.UserCardContent.helpers({
    data: function() {
        var user = Meteor.users.findOne({_id: this._id});
        if (!user) return;

        user.participation_score = User(user).getReadableScore();

        if (!user.partups) user.partups = [];
        if (!user.supporterOf) user.supporterOf = [];

        return user;
    }
});
