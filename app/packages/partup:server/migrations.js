Migrations.add({
    version: 1,
    name: 'Copy all inserted user and partup tags to Tags collection.',
    up: function() {
        var tags = [];

        // Collect all tags from user profiles
        Meteor.users.find().fetch().forEach(function(user) {
            if (user.tags !== undefined) {
                user.tags.forEach(function(tag) {
                    tags.push(tag.toLowerCase());
                });
            }
        });

        // Collect all tags from partups
        Partups.find().fetch().forEach(function(partup) {
            if (partup.tags !== undefined) {
                partup.tags.forEach(function(tag) {
                    tags.push(tag.toLowerCase());
                });
            }
        });

        // Remove duplicates
        var uniqueTags = tags.filter(function(elem, pos) {
            return tags.indexOf(elem) == pos;
        });

        // Now insert all collected tags into the database
        uniqueTags.forEach(function(tag) {
            if (!Tags.findOne({_id: tag})) {
                Tags.insert({_id: tag});
            }
        });

        Log.debug(uniqueTags.length + ' tags inserted in Tags collection.');
        console.log(uniqueTags.length + ' tags inserted in Tags collection.');
    },
    down: function() {
        // Code to migrate to previous version
    }
});
