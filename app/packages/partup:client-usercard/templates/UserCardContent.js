Template.UserCardContent.onCreated(function() {
    this.subscribe('users.one', this.data._id);
});
Template.UserCardContent.helpers({
    data: function() {
        var user = Meteor.users.findOne({_id: this._id});
        if (!user) return;

        user.participation_score = User(user).getReadableScore();

        if (!user.upperOf) user.upperOf = [];
        if (!user.supporterOf) user.supporterOf = [];

        return user;
    }
});
