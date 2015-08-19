Migrations.add({
    version: 1,
    name: 'Copy all inserted user and partup tags to Tags collection.',
    up: function() {
        var tags = [];

        // Collect all tags from user profiles
        Meteor.users.find().fetch().forEach(function(user) {
            if (user.tags !== undefined) {
                user.tags.forEach(function(tag) {
                    tags.push(tag.toLocaleLowerCase());
                });
            }
        });

        // Collect all tags from partups
        Partups.find().fetch().forEach(function(partup) {
            if (partup.tags !== undefined) {
                partup.tags.forEach(function(tag) {
                    tags.push(tag.toLocaleLowerCase());
                });
            }
        });

        // Remove duplicates
        var uniqueTags = tags.filter(function(elem, pos) {
            return tags.indexOf(elem) == pos;
        });

        // Now insert all collected tags into the database
        uniqueTags.forEach(function(tag) {
            var trimmedTag = tag.trim(); // Some tags had leading or trailing spaces
            if (!Tags.findOne({_id: trimmedTag})) {
                Tags.insert({_id: trimmedTag});
            }
        });

        Log.debug(uniqueTags.length + ' tags inserted in Tags collection.');
    },
    down: function() {
        // Code to migrate to previous version
    }
});

Migrations.add({
    version: 2,
    name: 'Save old images to new image stores',
    up: function() {
        console.log('Save old images to new image stores');
        Images.find().fetch().forEach(function(image) {
            if (image.copies['32x32'].size === 0) {
                console.log('creating 32x32 image: ' + image.name());
                var readStream = image.createReadStream('original');
                var writeStream = image.createWriteStream('32x32');
                gm(readStream, image.name()).resize(32, 32).stream().pipe(writeStream);
            }
            if (image.copies['80x80'].size === 0) {
                console.log('creating 80x80 image: ' + image.name());
                var readStream = image.createReadStream('original');
                var writeStream = image.createWriteStream('80x80');
                gm(readStream, image.name()).resize(80, 80).stream().pipe(writeStream);
            }
        });
    },
    down: function() {
    }
});

Migrations.add({
    version: 3,
    name: 'Add a slug to the existing Partups',
    up: function() {
        var partups = Partups.find({slug: {$exists: false}});

        partups.forEach(function(partup) {
            var slug = Partup.server.services.slugify.slugifyDocument(partup, 'name');
            Partups.update({_id:partup._id}, {$set: {slug: slug}});
        });
    },
    down: function() {
        Partups.update({slug: {$exists: true}}, {$unset: {slug: ''}}, {multi: true});
    }
});

Migrations.add({
    version: 4,
    name: 'Add a slug to the existing Networks',
    up: function() {
        var networks = Networks.find({slug: {$exists: false}});

        networks.forEach(function(network) {
            var slug = Partup.server.services.slugify.slugify(network.name);
            Networks.update({_id:network._id}, {$set: {slug: slug}});
        });
    },
    down: function() {
        Networks.update({slug: {$exists: true}}, {$unset: {slug: ''}}, {multi: true});
    }
});

Migrations.add({
    version: 5,
    name: 'Rename the user.profile.<social> fields to user.profile.<social>_url and prefix their values with i.e. https://facebook.com/. Also delete all linkedin_id fields.',
    up: function() {
        Meteor.users.find().forEach(function(user) {
            if (!user || !user.profile) return;

            if (user.profile.facebook) {
                user.profile.facebook_url = 'https://facebook.com/' + user.profile.facebook;
            }

            if (user.profile.instagram) {
                user.profile.instagram_url = 'https://instagram.com/' + user.profile.instagram;
            }

            if (user.profile.twitter) {
                user.profile.twitter_url = 'https://twitter.com/' + user.profile.twitter;
            }

            if (user.profile.linkedin) {
                user.profile.linkedin_url = 'https://linkedin.com/in/' + user.profile.linkedin;
            }

            if (user.profile.linkedin_id) {
                delete user.profile.linkedin_id;
            }

            Meteor.users.update({_id: user._id}, {$set: {'profile': user.profile}});
        });
    },
    down: function() {
        Meteor.users.find().forEach(function(user) {
            if (!user || !user.profile) return;

            if (user.profile.facebook_url) {
                delete user.profile.facebook_url;
            }

            if (user.profile.instagram_url) {
                delete user.profile.instagram_url;
            }

            if (user.profile.twitter_url) {
                delete user.profile.twitter_url;
            }

            if (user.profile.linkedin_url) {
                delete user.profile.linkedin_url;
            }

            Meteor.users.update({_id: user._id}, {$set: {'profile': user.profile}});
        });
    }
});

Migrations.add({
    version: 6,
    name: 'Calculate the Part-up participation score for users',
    up: function() {
        // TODO: Smarter way to do this, most likely not everyone
        // needs a Part-up participation score calculation
        Meteor.users.find({participation_score: {$exists: false}}).forEach(function(user) {
            var score = Partup.server.services.participation_calculator.calculateParticipationScoreForUpper(user._id);
            Meteor.users.update(user._id, {$set: {participation_score: score}});
        });
    },
    down: function() {
        Meteor.users.update({participation_score: {$exists: true}}, {$unset: {participation_score: ''}}, {multi: true});
    }
});

Migrations.add({
    version: 7,
    name: 'Calculate the Part-up progress score for partups',
    up: function() {
        // TODO: Smarter way to do this, most likely not all
        // partups need a progress score calculation
        Partups.find({progress: {$exists: false}}).forEach(function(partup) {
            var score = Partup.server.services.partup_progress_calculator.calculatePartupProgressScore(partup._id);
            Partups.update(partup._id, {'$set': {progress: score}});
        });
    },
    down: function() {
        Partups.update({progress: {$exists: true}}, {$unset: {progress: ''}}, {multi: true});
    }
});

Migrations.add({
    version: 8,
    name: 'Remove all notifications because they are incompatible at this point',
    up: function() {
        Notifications.remove({});
    },
    down: function() {
        // Nothing to do
    }
});

Migrations.add({
    version: 9,
    name: 'Remove duplicate IDs in user/partup/network arrays',
    up: function() {
        // Define the names of the user properties that contain arrays
        var arrayLists = ['supporterOf', 'upperOf', 'networks', 'pending_networks'];
        // Now go through all users and remove duplicate entries
        Meteor.users.find().fetch().forEach(function(user) {
            arrayLists.forEach(function(arrayList) {
                if (user[arrayList]) {
                    var uniqueValues = lodash.unique(user[arrayList]);
                    var setModifier = {$set: {}};
                    setModifier.$set[arrayList] = uniqueValues;
                    Meteor.users.update({_id: user._id}, setModifier);
                }
            });
        });

        // Repeat the above steps for partups and networks
        arrayLists = ['supporters', 'uppers', 'invites'];
        Partups.find().fetch().forEach(function(partup) {
            arrayLists.forEach(function(arrayList) {
                if (partup[arrayList]) {
                    var uniqueValues = lodash.unique(partup[arrayList]);
                    var setModifier = {$set: {}};
                    setModifier.$set[arrayList] = uniqueValues;
                    Partups.update({_id: partup._id}, setModifier);
                }
            });
        });

        arrayLists = ['uppers', 'pending_uppers'];
        Networks.find().fetch().forEach(function(network) {
            arrayLists.forEach(function(arrayList) {
                if (network[arrayList]) {
                    var uniqueValues = lodash.unique(network[arrayList]);
                    var setModifier = {$set: {}};
                    setModifier.$set[arrayList] = uniqueValues;
                    Networks.update({_id: network._id}, setModifier);
                }
            });
        });
    },
    down: function() {
        //
    }
});

Migrations.add({
    version: 10,
    name: 'Add flags and email settings to existing users',
    up: function() {
        Meteor.users.update({}, {
            '$set': {
                'flags.dailyDigestEmailHasBeenSent': false,
                'profile.settings.email.dailydigest': true
            }
        }, {multi:true});
    },
    down: function() {
        //
    }
});

Migrations.add({
    version: 11,
    name: 'Set language on all current partups',
    up: function() {
        Partups.find().fetch().forEach(function(partup) {
            if (!partup.language) {
                var language = Partup.server.services.google.detectLanguage(partup.description);
                Log.debug('Setting language *' + language + '* for Partup "' + partup.name + '"');
                Partups.update({_id: partup._id}, {$set: {language: language}});
            }
        });
    },
    down: function() {
        //
    }
});

Migrations.migrateTo(11);
