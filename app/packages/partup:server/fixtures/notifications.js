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
                        '_id': 'gJngF65ZWyS9f3NDE',
                        'name' : 'Crowd funding Part-up organiseren'
                    },
                    'supporter' : {
                        '_id' : 'K5c5M4Pbdg3B82wQI',
                        'name' : 'John Partup',
                        'image' : 'cHhjpWKo9DHjXQQjy'
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
                        '_id': 'gJngF65ZWyS9f3NDE',
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
                        '_id' : 'K5c5M4Pbdg3B82wQI',
                        'name' : 'John Partup',
                        'image' : 'cHhjpWKo9DHjXQQjy'
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
                        '_id': 'gJngF65ZWyS9f3NDE',
                        'name' : 'Crowd funding Part-up organiseren'
                    },
                    'supporter' : {
                        '_id' : 'a7qcp5RHnh5rfaeW9',
                        'name' : 'Judy Partup',
                        'image' : 'bMTGT9oSDGzxCL3r4'
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
                        '_id': 'gJngF65ZWyS9f3NDE',
                        'name' : 'Crowd funding Part-up organiseren'
                    },
                    'supporter' : {
                        '_id' : 'a7qcp5RHnh5rfaeW9',
                        'name' : 'Judy Partup',
                        'image' : 'bMTGT9oSDGzxCL3r4'
                    }
                },
                'created_at' : new Date('2015-07-21T14:11:51.763Z'),
                'new' : true
            });

            /* 6 */
            Notifications.insert({
                '_id' : 'ERwBsEAExaN95yZ3y',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQH',
                'type' : 'partups_networks_invited',
                'type_data' : {
                    'network' : {
                        '_id': 'kRCjWDBkKru3KfsjW',
                        'name' : 'ING (invite)',
                        'image' : 'efDuvuTzpqH65P9DF'
                    }
                },
                'created_at' : new Date('2015-07-22T09:00:30.168Z'),
                'new' : true
            });

            /* 7 */
            Notifications.insert({
                '_id' : 'o9E59Hsi4FLZmcfhy',
                'for_upper_id' : 'a7qcp5RHnh5rfaeW9',
                'type' : 'partups_networks_invited',
                'type_data' : {
                    'network' : {
                        '_id': 'kRCjWDBkKru3KfsjW',
                        'name' : 'ING (invite)',
                        'image' : 'efDuvuTzpqH65P9DF'
                    }
                },
                'created_at' : new Date('2015-07-22T09:11:08.083Z'),
                'new' : true
            });

            /* 8 */
            Notifications.insert({
                '_id' : 'qK2d2j4PBoNzKrqPA',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQI',
                'type' : 'partups_networks_invited',
                'type_data' : {
                    'network' : {
                        '_id': 'wfCv4ZdPe5WNT4xfg',
                        'name' : 'ING (closed)',
                        'image' : 'PnYAg3EX5dKfEnkdn'
                    }
                },
                'created_at' : new Date('2015-07-22T09:12:46.323Z'),
                'new' : true
            });

            /* 9 */
            Notifications.insert({
                '_id' : 'yhkbye8nzLzxN7399',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQI',
                'type' : 'partups_networks_accepted',
                'type_data' : {
                    'network' : {
                        '_id': 'wfCv4ZdPe5WNT4xfg',
                        'name' : 'ING (closed)',
                        'image' : 'PnYAg3EX5dKfEnkdn'
                    }
                },
                'created_at' : new Date('2015-07-22T09:23:58.070Z'),
                'new' : true
            });

            /* 10 */
            Notifications.insert({
                '_id' : 'xWx3q5f8Wviq6tuSD',
                'for_upper_id' : 'a7qcp5RHnh5rfaeW9',
                'type' : 'partups_networks_invited',
                'type_data' : {
                    'network' : {
                        '_id': 'wfCv4ZdPe5WNT4xfg',
                        'name' : 'ING (closed)',
                        'image' : 'PnYAg3EX5dKfEnkdn'
                    }
                },
                'created_at' : new Date('2015-07-22T09:31:48.389Z'),
                'new' : true
            });

            /* 11 */
            Notifications.insert({
                '_id' : 'zBWjQJLbB3s6XJbi7',
                'for_upper_id' : 'K5c5M4Pbdg3B82wQH',
                'type' : 'partups_ratings_reminder',
                'type_data' : {
                    'partup' : {
                        '_id': 'gJngF65ZWyS9f3NDE',
                        'name' : 'Crowd funding Part-up organiseren'
                    }
                },
                'created_at' : new Date('2015-07-21T14:08:02.831Z'),
                'new' : true
            });
        }
    }
});
