Template.UserCardContent.helpers({
    data: function() {
        var user = Meteor.users.findOne({_id: this._id});
        var score = user.participation_score;

        // For design purposes, we only want to display
        // a max value of 99 and a min value of 10,
        // every number should be a natural one
        score = Math.min(99, score);
        score = Math.max(10, score);
        score = Math.round(score);

        user.participation_score = score;

        return user;
    }
});
