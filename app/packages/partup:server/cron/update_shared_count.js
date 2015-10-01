SyncedCron.add({
    name: 'Update the shared counts of a partup from different socials',
    schedule: function(parser) {
        return parser.text('every 1 hour starting on the 10th minute');
    },
    job: function() {
        if (!process.env.NODE_ENV.match(/development/)) {
            Partups.find({}).forEach(function(partup) {
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

                console.log('Part-up share counts were updated.');
            });
        }
    }
});
