Meteor.startup(function() {
    if (process.env.NODE_ENV.match(/development|staging/)) {
        if (!Partups.find().count()) {

            Partups.insert({
                '_id' : 'gJngF65ZWyS9f3NDE',
                'name' : 'Crowd funding Part-up organiseren',
                'description' : 'Crowd funding campagne lanceren voor marketing en financiering app development.',
                'budget_type' : 'money',
                'budget_money' : 1000,
                'budget_hours' : null,
                'end_date' : new Date('2016-11-30T00:00:00.000Z'),
                'image' : '3FeYwzJdFfj8enTDY',
                'tags' : [ 
                    'crowdfunding', 
                    'marketing', 
                    'part-up', 
                    'geld'
                ],
                'location' : {
                    'city' : 'Amsterdam',
                    'lat' : 52.3702157000000028,
                    'lng' : 4.8951679000000006,
                    'place_id' : 'ChIJVXealLU_xkcRja_At0z9AGY',
                    'country' : 'Netherlands'
                },
                'privacy_type' : 1,
                'uppers' : [ 
                    'K5c5M4Pbdg3B82wQH', 
                    'K5c5M4Pbdg3B82wQI'
                ],
                'creator_id' : 'K5c5M4Pbdg3B82wQH',
                'created_at' : new Date('2015-07-21T14:03:19.964Z'),
                'slug' : 'crowd-funding-part-up-organiseren-gJngF65ZWyS9f3NDE',
                'activity_count' : 2,
                'analytics' : {
                    'clicks_total' : 1,
                    'clicks_per_day' : 1,
                    'clicks_per_hour' : [ 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        1, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0
                    ],
                    'last_ip' : '127.0.0.1'
                },
                'supporters' : [ 
                    'a7qcp5RHnh5rfaeW9'
                ]
            });

            // uncomment for infinite scroll testing
            // for (var i = 0; i < 30; i++) {
            //     var descriptions = [
            //         'This describes just how great this Part-up is, so please join and let\'s make it the best part-up on the web.',
            //         'This describes just how great this Part-up is.',
            //         'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima error veritatis ratione dolor perferendis inventore optio. Error omnis nostrum expedita.',
            //         'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum repudiandae exercitationem unde sunt voluptatum consequatur at ipsum incidunt praesentium. Lorem ipsum dolor sit amet.'
            //     ];
            //
            //     Partups.insert({
            //         _id: '1111' + i,
            //         name: Fake.fromArray([Fake.sentence(2), Fake.sentence(3), Fake.sentence(4), Fake.sentence(5)]).replace('.', ''),
            //         description: Fake.paragraph(Fake.fromArray([1,2,3,4])),
            //         creator_id: user1Id,
            //         tags: Fake.fromArray([[Fake.word()], [Fake.word(), Fake.word()], [Fake.word(), Fake.word(), Fake.word()], [Fake.word(), Fake.word(), Fake.word(), Fake.word()]]),
            //         uppers: [user1Id, user2Id],
            //         location: undefined,
            //         privacy_type: Partups.PUBLIC,
            //         image: null,
            //         created_at : new Date('2015-03-26T16:25:07.816Z'),
            //         end_date: new Date('2015-06-01T10:00:07.100Z'),
            //     });
            // }
        }
    }
});
