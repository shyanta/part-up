Meteor.startup(function () {
    if (process.env.NODE_ENV.match(/development|staging/)) {
        // Users
        if (!Meteor.users.find().count()) {
            var user1 = {
                "_id" : "K5c5M4Pbdg3B82wQH",
                "createdAt" : new Date(),
                "services" : {
                    "password" : {
                        "bcrypt" : "$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG"
                    }
                },
                "emails" : [
                    {
                        "address" : "user@example.com",
                        "verified" : false
                    }
                ],
                "profile" : {
                    "name" : "Default User"
                }
            };
            var user1Id = Meteor.users.insert(user1);

            var user2 = {
                "_id" : "K5c5M4Pbdg3B82wQI",
                "createdAt" : new Date(),
                "services" : {
                    "password" : {
                        "bcrypt" : "$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG"
                    }
                },
                "emails" : [
                    {
                        "address" : "admin@example.com",
                        "verified" : false
                    }
                ],
                "profile" : {
                    "name" : "Admin User"
                }
            };
            var user2Id = Meteor.users.insert(user2);

        }

        if (!Partups.find().count()) {
            var firstPartup = {
                _id: '1111',
                name: 'First awesome Part-Up!',
                description: "This describes just how great this Part-up is, so please join and let's make it the best part-up on the web.",
                creator_id: user1Id,
                tags: ['partup', 'online', 'awesome', 'test'],
                uppers: [user1Id, user2Id],
                location : {
                    "city" : "amsterdam"
                },
                image: null,
                created_at : new Date("2015-03-26T16:25:07.816Z"),
                end_date: new Date("2015-06-01T10:00:07.100Z"),
                network: {
                    name: 'superheroes',
                    icon: {
                        url: 'http://vignette1.wikia.nocookie.net/clubpenguin/images/8/87/Superhero_Pin_icon.png/revision/latest?cb=20120614132335'
                    }
                },
                visibility: 'private'
            };
            var firstPartupId = Partups.insert(firstPartup);

            var secondPartup = {
                _id: '2222',
                name: 'Develop new website for our startup',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus elit, fringilla maximus diam ac, porttitor pellentesque velit. Pellentesque vehicula id urna et varius. Donec feugiat neque pulvinar suscipit blandit. Donec sed libero id mauris tincidunt euismod. Proin non nunc orci. Vivamus nec est hendrerit enim scelerisque dignissim vel et orci. Aliquam luctus eros et orci tempus, sit amet mollis diam viverra.',
                creator_id: user2Id,
                tags: ['test', 'lorem', 'ipsum'],
                uppers: [user1Id],
                location : {
                    "city" : "amsterdam"
                },
                image: null,
                created_at : new Date("2015-03-26T16:25:07.816Z"),
                supporters: [user2Id],
                end_date: new Date("2015-08-01T10:00:07.100Z"),
                network: {
                    name: 'lifely',
                    icon: {
                        url: 'http://lifely.nl/bundles/lifelywebsite/frontend/resources/img/icons/icon76.png'
                    }
                },
                visibility: 'public'
            };
            var secondPartupId = Partups.insert(secondPartup);
        }

        if (!Activities.find().count()) {
            var firstActivity = {
                _id: '1111',
                partup_id: firstPartupId,
                name: 'First activity',
                description: 'We need to define some activities here.',
                creator_id: user1Id,
                end_date: new Date()
            };
            Activities.insert(firstActivity);

            var secondActivity = {
                _id: '2222',
                partup_id: firstPartupId,
                name: 'And another activity to demonstrate this concept',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus elit, fringilla maximus diam ac, porttitor pellentesque velit. Pellentesque vehicula id urna et varius. Donec feugiat neque pulvinar suscipit blandit. Donec sed libero id mauris tincidunt euismod. Proin non nunc orci.',
                creator_id: user2Id,
                end_date: new Date()
            };
            Activities.insert(secondActivity);

            var thirdActivity = {
                _id: '3333',
                partup_id: secondPartupId,
                name: 'We are all about activities',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus elit, fringilla maximus diam ac, porttitor pellentesque velit. Pellentesque vehicula id urna et varius. Donec feugiat neque pulvinar suscipit blandit. Donec sed libero id mauris tincidunt euismod. Proin non nunc orci.',
                creator_id: user1Id,
                end_date: new Date()
            };
            Activities.insert(thirdActivity);
        }
    }
});
