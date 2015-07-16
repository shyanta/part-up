SyncedCron.add({
    name: 'Calculate the Part-up participation score for users',
    schedule: function(parser) {
        return parser.text('every 1 hour');
    },
    job: function() {
        // TODO: Smarter way to do this, most likely not everyone
        // needs a Part-up participation score calculator
        var userIds = Meteor.users.find({}).forEach(function(user) {
            var score = Partup.server.services.participation_calculator.calculateParticipationScoreForUpper(user._id);
            Meteor.users.update(user._id, {'$set': {participation_score: score}});
        });
    }
});
