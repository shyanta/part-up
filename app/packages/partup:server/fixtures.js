Meteor.startup(function() {
    if (process.env.NODE_ENV.match(/development|staging/)) {
        // Users
        if (!Meteor.users.find().count()) {
            var user1 = {
                '_id' : 'K5c5M4Pbdg3B82wQH',
                'createdAt' : new Date(),
                'services' : {
                    'password' : {
                        'bcrypt' : '$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG'
                    }
                },
                'emails' : [
                    {
                        'address' : 'user@example.com',
                        'verified' : false
                    }
                ],
                'profile' : {
                    'name' : 'Default User'
                }
            };
            var user1Id = Meteor.users.insert(user1);

            var user2 = {
                '_id' : 'K5c5M4Pbdg3B82wQI',
                'createdAt' : new Date(),
                'services' : {
                    'password' : {
                        'bcrypt' : '$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG'
                    }
                },
                'emails' : [
                    {
                        'address' : 'admin@example.com',
                        'verified' : false
                    }
                ],
                'profile' : {
                    'name' : 'Admin User'
                }
            };
            var user2Id = Meteor.users.insert(user2);

        }

        if (!Partups.find().count()) {
            var firstPartup = {
                '_id' : '1111',
                'name' : 'Benefiet concert organiseren',
                'description' : 'een benefietconcert organiseren',
                'budget_type' : 'money',
                'budget_money' : 1500,
                'budget_hours' : null,
                'end_date' : new Date('2015-03-26T16:25:07.816Z'),
                'image' : 'ksXJa59XoYtTE9m2w',
                'tags' : [
                    'concert',
                    'benefiet'
                ],
                'location' : {
                    'city' : 'Amsterdam',
                    'lat' : 52.3702157000000028,
                    'lng' : 4.8951679000000006,
                    'place_id' : 'ChIJVXealLU_xkcRja_At0z9AGY',
                    'country' : 'Netherlands'
                },
                'privacy_type' : 1,
                'uppers': [user1Id, user2Id],
                'creator_id': user1Id,
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'activity_count' : 3,
                'analytics' : {
                    'clicks_total' : 1,
                    'clicks_per_day' : 1,
                    'clicks_per_hour' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    'last_ip' : '127.0.0.1'
                }
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
                    city : 'Amstelveen',
                    lat : 52.3114206999999993,
                    lng : 4.8700869999999998,
                    place_id : 'ChIJL2JPy9DhxUcRqXfKsBMyNVw',
                    country : 'Netherlands'
                },
                image: null,
                created_at : new Date('2015-03-26T16:25:07.816Z'),
                supporters: [user2Id],
                end_date: new Date('2015-08-01T10:00:07.100Z'),
                network: {
                    name: 'lifely',
                    icon: {
                        url: 'http://lifely.nl/bundles/lifelywebsite/frontend/resources/img/icons/icon76.png'
                    }
                },
                visibility: 'public'
            };
            var secondPartupId = Partups.insert(secondPartup);

            for (var i = 0; i < 30; i++) {
                var descriptions = [
                    'This describes just how great this Part-up is, so please join and let\'s make it the best part-up on the web.',
                    'This describes just how great this Part-up is.',
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima error veritatis ratione dolor perferendis inventore optio. Error omnis nostrum expedita.',
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum repudiandae exercitationem unde sunt voluptatum consequatur at ipsum incidunt praesentium. Lorem ipsum dolor sit amet.'
                ];

                Partups.insert({
                    _id: '1111' + i,
                    name: Fake.fromArray([Fake.sentence(2), Fake.sentence(3), Fake.sentence(4), Fake.sentence(5)]).replace('.', ''),
                    description: Fake.paragraph(Fake.fromArray([1,2,3,4])),
                    creator_id: user1Id,
                    tags: Fake.fromArray([[Fake.word()], [Fake.word(), Fake.word()], [Fake.word(), Fake.word(), Fake.word()], [Fake.word(), Fake.word(), Fake.word(), Fake.word()]]),
                    uppers: [user1Id, user2Id],
                    location: undefined,
                    privacy_type: Partups.PUBLIC,
                    image: null,
                    created_at : new Date('2015-03-26T16:25:07.816Z'),
                    end_date: new Date('2015-06-01T10:00:07.100Z'),
                });
            }
        }

        if (!Activities.find().count()) {

            var firstActivity = {
                '_id' : 'ZtJwZWikiFE7HpXLk',
                'name' : 'Venue regelen',
                'description' : null,
                'end_date' : null,
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'updated_at' : new Date('2015-03-26T16:25:07.816Z'),
                'creator_id' : user1Id,
                'partup_id' : firstPartupId,
                'archived' : false,
                'update_id' : '8yimy7xTgDW5EHxL8'
            };
            var firstActivityId = Activities.insert(firstActivity);

            var secondActivity = {
                '_id' : '6THweQQmX243avfNx',
                'name' : 'Artiesten boeken',
                'description' : null,
                'end_date' : null,
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'updated_at' : new Date('2015-03-26T16:25:07.816Z'),
                'creator_id' : user1Id,
                'partup_id' : firstPartupId,
                'archived' : false,
                'update_id' : 'G6iTtuC7DBnTvB67d'
            };
            var secondActivityId = Activities.insert(secondActivity);

            var thirdActivity = {
                '_id' : 'WYRwjegCQoEqH64bE',
                'name' : 'Catering regelen',
                'description' : 'Hapjes en drankjes',
                'end_date' : new Date('2015-03-26T16:25:07.816Z'),
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'updated_at' : new Date('2015-03-26T16:25:07.816Z'),
                'creator_id' : user1Id,
                'partup_id' : firstPartupId,
                'archived' : false,
                'update_id' : 'jMGn2hRAhoX639kmm'
            };
            var thirdActivityId = Activities.insert(thirdActivity);
        }

        if (!Updates.find().count()) {
            var firstUpdate = {
                '_id' : '8yimy7xTgDW5EHxL8',
                'upper_id' : user1Id,
                'partup_id' : firstPartupId,
                'type' : 'partups_activities_added',
                'type_data' : {
                    'activity_id' : firstActivityId
                },
                'comments_count' : 2,
                'comments': [
                    {
                        '_id' : 'shrxXzCEsuDWR8BQt',
                        'content' : 'system_contributions_added',
                        'system' : true,
                        'creator' : {
                            '_id' : user2Id,
                            'name' : 'meeuw'
                        },
                        'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                        'updated_at' : new Date('2015-03-26T16:25:07.816Z')
                    },
                    {
                        '_id' : 'WQL7FK8ZM5SwyxhdR',
                        'content' : 'system_contributions_updated',
                        'system' : true,
                        'creator' : {
                            '_id' : user1Id,
                            'name' : 'Peter Peerdeman'
                        },
                        'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                        'updated_at' : new Date('2015-03-26T16:25:07.816Z')
                    }
                ],
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'updated_at' : new Date('2015-03-26T16:25:07.816Z')
            };
        }

        if (!Contributions.find().count()) {
            var firstContribution = {
                '_id' : 'TtC4Dnbo4CSdTLR9L',
                'hours' : 10,
                'rate' : 50,
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'activity_id' : firstActivityId,
                'upper_id' : user2Id,
                'partup_id' : firstPartupId,
                'verified' : true,
                'update_id' : 'FzvicjkgyXPiYTqbs',
                'updated_at' : new Date('2015-03-26T16:25:07.816Z')
            };
            var firstContributionId = Contributions.insert(firstContribution);

            var secondContribution = {
                '_id' : 'JbXCzb82hqm4Bjwze',
                'hours' : null,
                'rate' : null,
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'activity_id' : firstActivityId,
                'upper_id' : user2Id,
                'partup_id' : firstPartupId,
                'verified' : false,
                'update_id' : '38mpZCcjpS8vBA8Ys'
            };
            var secondContributionId = Contributions.insert(secondContribution);
        }

        if (!Ratings.find().count()) {
            var firstRating = {
                '_id' : 'RFeS64fWGBzKy8GDf',
                'created_at' : new Date('2015-03-26T16:25:07.816Z'),
                'partup_id' : firstPartupId,
                'activity_id' : firstActivityId,
                'contribution_id' : firstContributionId,
                'rating' : 80,
                'feedback' : 'goed gedaan!',
                'upper_id' : user1Id,
                'rated_upper_id' : user2Id,
                'updated_at' : new Date('2015-03-26T16:25:07.816Z')
            };
            var firstRatingId = Ratings.insert(firstRating);
        }

        if (!Networks.find().count()) {
            var firstNetwork = {
                _id: '22vvMrN56rZbHfucm',
                privacy_type: 1,
                name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum facere mollitia veritatis tempore. Modi dolor distinctio fugiat voluptas, nemo dignissimos sint, voluptatibus in deserunt esse eos autem adipisci quibusdam minima quasi, porro error provident incidunt illo. Unde error veniam, eaque libero? Quam iusto sapiente, quae ullam facilis aliquid voluptate, blanditiis tempore fuga nobis dignissimos tempora doloribus laudantium, repudiandae nam! Optio molestiae, hic quasi illo, officiis eius accusantium eveniet officia cupiditate nostrum voluptatibus ducimus inventore vero repudiandae eaque et vel consequuntur quaerat provident. Recusandae perferendis alias magnam, laudantium distinctio repellat! Est voluptatibus dolorum omnis odit quis vitae doloribus laborum nulla odio.',
                tags: ['network', 'public', 'Lorem', 'ipsum', 'sit', 'amet', 'dolor'],
                location : {
                    city : 'Amstelveen',
                    lat : 52.3114206999999993,
                    lng : 4.8700869999999998,
                    place_id : 'ChIJL2JPy9DhxUcRqXfKsBMyNVw',
                    country : 'Netherlands'
                },
                uppers: ['K5c5M4Pbdg3B82wQH', 'K5c5M4Pbdg3B82wQI'],
                partups: ['1111', '2222'],
                admin_id: 'K5c5M4Pbdg3B82wQH',
                website: 'http://lifely.nl/',
                created_at: new Date(),
                updated_at: new Date(),
                pending_uppers: [],
                invites: []
            };
            Networks.insert(firstNetwork);

            var secondNetwork = {
                _id: 'pvu55tai2hwmSAKfE',
                privacy_type: 2,
                name: 'Invitational Network',
                description: 'This is an invitational network.',
                tags: ['network', 'invite'],
                location : {
                    city : 'Amstelveen',
                    lat : 52.3114206999999993,
                    lng : 4.8700869999999998,
                    place_id : 'ChIJL2JPy9DhxUcRqXfKsBMyNVw',
                    country : 'Netherlands'
                },
                uppers: ['K5c5M4Pbdg3B82wQH'],
                admin_id: 'K5c5M4Pbdg3B82wQH',
                created_at: new Date(),
                updated_at: new Date(),
                pending_uppers: [],
                invites: []
            };
            Networks.insert(secondNetwork);

            var thirdNetwork = {
                _id: 'MLKKnGhxrfGaLt84P',
                privacy_type: 3,
                name: 'Closed Network',
                description: 'This is a closed network.',
                tags: ['network', 'closed', 'private'],
                location : {
                    city : 'Amstelveen',
                    lat : 52.3114206999999993,
                    lng : 4.8700869999999998,
                    place_id : 'ChIJL2JPy9DhxUcRqXfKsBMyNVw',
                    country : 'Netherlands'
                },
                uppers: ['K5c5M4Pbdg3B82wQH'],
                admin_id: 'K5c5M4Pbdg3B82wQH',
                created_at: new Date(),
                updated_at: new Date(),
                pending_uppers: [],
                invites: []
            };
            Networks.insert(thirdNetwork);
        }
    }
});
