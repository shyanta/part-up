SyncedCron.add({
    name: 'Calculate the Part-up popularity score for partups',
    schedule: function(parser) {
        return parser.text('every 1 hour starting on the 15th minute');
    },
    job: function() {
        Partups.find({}).forEach(function(partup) {
            var score = Partup.server.services.partup_popularity_calculator.calculatePartupPopularityScore(partup._id);
            Partups.update(partup._id, {'$set': {popularity: score}});
        });
    }
});
