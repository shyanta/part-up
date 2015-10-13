SyncedCron.add({
    name: 'Update the shared counts of a partup from different socials',
    schedule: function(parser) {
        return parser.text('every 10 minutes');
    },
    job: function() {
        if (!process.env.NODE_ENV.match(/development/)) {
            var numberOfAffectedPartups = 0;
            Partups.find({}, {sort: {refreshed_at: -1}, limit: 10}).forEach(function(partup) {
                var counts = {
                    facebook: Partup.server.services.shared_count.facebook(Meteor.absoluteUrl() + 'partups/' + partup.slug),
                    twitter: Partup.server.services.shared_count.twitter(Meteor.absoluteUrl() + 'partups/' + partup.slug),
                    linkedin: Partup.server.services.shared_count.linkedin(Meteor.absoluteUrl() + 'partups/' + partup.slug)
                };
                Partups.update(partup._id, {
                    $set: {
                        'shared_count.facebook': counts.facebook,
                        'shared_count.twitter': counts.twitter,
                        'shared_count.linkedin': counts.linkedin
                    }
                });
                numberOfAffectedPartups++;
            });
            console.log(numberOfAffectedPartups + ' Part-up share counts were updated.');
        }
    }
});
