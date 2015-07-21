Meteor.startup(function() {
    if (process.env.NODE_ENV.match(/development|staging/)) {
        if (!Notifications.find().count()) {

            /* 1 */
            Notifications.insert({
                '_id' : 'zBWjQJLbB3s6XJbi7',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQH',
                'type' : 'partups_supporters_added',
                'type_data' : {
                    'partup' : {
                        'name' : 'Crowd funding Part-up organiseren'
                    },
                    'supporter' : {
                        'id' : 'K5c5M4Pbdg3B82wQI',
                        'name' : 'John Partup',
                        'image' : 'nL2MYYXJ3eFeb2GYq'
                    }
                },
                'created_at' : new Date('2015-07-21T14:08:02.831Z'),
                'new' : true
            });

            /* 2 */
            Notifications.insert({
                '_id' : '924QY78LuAhmr3g8P',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQI',
                'type' : 'partups_contributions_accepted',
                'type_data' : {
                    'partup' : {
                        'name' : 'Crowd funding Part-up organiseren',
                        'image' : '3FeYwzJdFfj8enTDY'
                    }
                },
                'created_at' : new Date('2015-07-21T14:09:44.629Z'),
                'new' : true
            });

            /* 3 */
            Notifications.insert({
                '_id' : 'RLAuZh7JtqAD9qzHh',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQI',
                'type' : 'contributions_ratings_inserted',
                'type_data' : {
                    'rater' : {
                        'id' : 'K5c5M4Pbdg3B82wQI',
                        'name' : 'John Partup',
                        'image' : 'nL2MYYXJ3eFeb2GYq'
                    }
                },
                'created_at' : new Date('2015-07-21T14:09:50.912Z'),
                'new' : true
            });

            /* 4 */
            Notifications.insert({
                '_id' : 'rizKNF2EnSHp8naRd',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQH',
                'type' : 'partups_supporters_added',
                'type_data' : {
                    'partup' : {
                        'name' : 'Crowd funding Part-up organiseren'
                    },
                    'supporter' : {
                        'id' : 'a7qcp5RHnh5rfaeW9',
                        'name' : 'Judy Partup',
                        'image' : 'LG9J5XA4PPg5B8ZNu'
                    }
                },
                'created_at' : new Date('2015-07-21T14:11:51.761Z'),
                'new' : true
            });

            /* 5 */
            Notifications.insert({
                '_id' : '2Ls7pgz7oAiyg5X2N',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQI',
                'type' : 'partups_supporters_added',
                'type_data' : {
                    'partup' : {
                        'name' : 'Crowd funding Part-up organiseren'
                    },
                    'supporter' : {
                        'id' : 'a7qcp5RHnh5rfaeW9',
                        'name' : 'Judy Partup',
                        'image' : 'LG9J5XA4PPg5B8ZNu'
                    }
                },
                'created_at' : new Date('2015-07-21T14:11:51.763Z'),
                'new' : true
            });
        }
    }
});
