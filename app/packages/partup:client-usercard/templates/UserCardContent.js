Template.UserCardContent.helpers({
    data: function() {
        var user = Meteor.users.findOne({_id: this._id});

        user.participation_score = User(user).getReadableScore();

        return user;
    }
});
