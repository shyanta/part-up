Meteor.startup(function() {
    if (process.env.NODE_ENV.match(/development|staging/)) {

        if (!Meteor.users.find().count()) {
            Meteor.users.insert({
                '_id' : 'K5c5M4Pbdg3B82wQH',
                'createdAt' : new Date(),
                'services' : {
                    'password' : {
                        'bcrypt' : '$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG'
                    },
                    'resume' : {
                        'loginTokens' : [
                            {
                                'when' : new Date(),
                                'hashedToken' : 'yoxRsvKflDfC/tKh2en1Pka+rVymsYIQ3QOlq0EVSB4='
                            }
                        ]
                    },
                    'email' : {
                        'verificationTokens' : [
                            {
                                'token' : 'CTel11muhC80_UYGDcVz8J5kTU4zkli_UEo73oH427d',
                                'address' : 'user@example.com',
                                'when' : new Date()
                            }
                        ]
                    }
                },
                'emails' : [
                    {
                        'address' : 'user@example.com',
                        'verified' : false
                    }
                ],
                'completeness' : 100,
                'profile' : {
                    'name' : 'Default User',
                    'settings' : {
                        'locale' : 'en',
                        'optionalDetailsCompleted' : true,
                        'email': {
                            'dailydigest': true,
                            'upper_mentioned_in_partup': true,
                            'invite_upper_to_partup_activity': true,
                            'invite_upper_to_network': true
                        },
                        'unsubscribe_email_token': 'nj8fwDnhzaPSKX4vf-8ZHFyWRL0ZKVRz00ZOrJdB-ug'
                    },
                    'image' : 'oQeqgwkdd44JSBSW5',
                    'description' : 'I am the first test user',
                    'tags' : [
                        'education',
                        'school',
                        'teaching'
                    ],
                    'location' : {
                        'city' : 'Amsterdam',
                        'lat' : 52.3702157000000028,
                        'lng' : 4.8951679000000006,
                        'place_id' : 'ChIJVXealLU_xkcRja_At0z9AGY',
                        'country' : 'Netherlands'
                    },
                    'facebook_url' : 'https://www.facebook.com/zuck',
                    'twitter_url' : 'https://twitter.com/finkd',
                    'instagram_url' : 'https://instagram.com/zuck/',
                    'linkedin_url' : 'https://www.linkedin.com/pub/mark-zuckerberg/0/290/362',
                    'phonenumber' : '+31612345678',
                    'website' : 'http://www.facebook.com',
                    'skype' : 'markzuckerberg'
                },
                'status' : {
                    'online' : true,
                    'lastLogin' : {
                        'date' : new Date('2015-07-21T13:29:39.740Z'),
                        'ipAddr' : '127.0.0.1',
                        'userAgent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36'
                    },
                    'idle' : false
                },
                'registered_emails' : [
                    {
                        'address' : 'user@example.com',
                        'verified' : false
                    }
                ],
                'logins' : [
                    new Date('2015-07-21T13:29:39.754Z')
                ],
                'networks' : [
                    'ibn27M3ePaXhmKzWq',
                    'kRCjWDBkKru3KfsjW'
                ],
                'participation_score' : 2,
                'upperOf' : [
                    'ASfRYBAzo2ayYk5si',
                    'WxrpPuJkhafJB3gfF',
                    'gJngF65ZWyS9f3NDE'
                ],
                'flags': {
                    'dailyDigestEmailHasBeenSent': false
                }
            });

            Meteor.users.insert({
                '_id' : 'K5c5M4Pbdg3B82wQI',
                'createdAt' : new Date('2015-07-21T13:43:28.401Z'),
                'services' : {
                    'password' : {
                        'bcrypt' : '$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG'
                    },
                    'resume' : {
                        'loginTokens' : [
                            {
                                'when' : new Date('2015-07-21T13:43:28.427Z'),
                                'hashedToken' : 'OpaU/qV1S7zHl00V9Nkvc9cd6HVBgldaSOjxTbZKLUk='
                            }
                        ]
                    },
                    'email' : {
                        'verificationTokens' : [
                            {
                                'token' : 'iLvpqSreco1pP4vBXXpxf3_tASF-KeDKMcDv1STKLhD',
                                'address' : 'john@example.com',
                                'when' : new Date('2015-07-21T13:43:33.407Z')
                            }
                        ]
                    }
                },
                'emails' : [
                    {
                        'address' : 'john@example.com',
                        'verified' : false
                    }
                ],
                'completeness' : 27,
                'profile' : {
                    'name' : 'John Partup',
                    'settings' : {
                        'locale' : 'en',
                        'optionalDetailsCompleted' : true,
                        'email': {
                            'dailydigest': true,
                            'upper_mentioned_in_partup': true,
                            'invite_upper_to_partup_activity': true,
                            'invite_upper_to_network': true
                        },
                        'unsubscribe_email_token': '6BQGhT9KnxBKAIrn6Y7s565CTOO-SIqfjuHOkJt8ZbQ'
                    },
                    'image' : 'cHhjpWKo9DHjXQQjy',
                    'description' : null,
                    'tags' : [
                        'education',
                        'nonprofit',
                        'development'
                    ],
                    'location' : {
                        'city' : 'Amstelveen',
                        'lat' : 52.3114206999999993,
                        'lng' : 4.8700869999999998,
                        'place_id' : 'ChIJL2JPy9DhxUcRqXfKsBMyNVw',
                        'country' : 'Netherlands'
                    },
                    'facebook_url' : null,
                    'twitter_url' : null,
                    'instagram_url' : null,
                    'linkedin_url' : null,
                    'phonenumber' : null,
                    'website' : '',
                    'skype' : null
                },
                'status' : {
                    'online' : true,
                    'lastLogin' : {
                        'date' : new Date('2015-07-21T13:43:28.514Z'),
                        'ipAddr' : '127.0.0.1',
                        'userAgent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36'
                    },
                    'idle' : false
                },
                'registered_emails' : [
                    {
                        'address' : 'john@example.com',
                        'verified' : false
                    }
                ],
                'logins' : [
                    new Date('2015-07-21T13:43:28.542Z')
                ],
                'participation_score' : 3,
                'pending_networks' : [],
                'networks' : [
                    'wfCv4ZdPe5WNT4xfg'
                ],
                'upperOf' : [
                    'CJETReuE6uo2eF7eW',
                    'gJngF65ZWyS9f3NDE'
                ],
                'flags': {
                    'dailyDigestEmailHasBeenSent': false
                }
            });

            Meteor.users.insert({
                '_id' : 'q63Kii9wwJX3Q6rHS',
                'createdAt' : new Date('2015-07-21T13:48:03.558Z'),
                'services' : {
                    'password' : {
                        'bcrypt' : '$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG'
                    },
                    'resume' : {
                        'loginTokens' : [
                            {
                                'when' : new Date('2015-07-21T13:48:03.566Z'),
                                'hashedToken' : 'vctK9ULMl4Gdegbr+73LED8So83rPz67Xi6KnnNQCVQ='
                            }
                        ]
                    },
                    'email' : {
                        'verificationTokens' : [
                            {
                                'token' : '8crlkpFefwhO_RdgJbnV-8q4S-_M0yfjFsn--YYh4YZ',
                                'address' : 'admin@example.com',
                                'when' : new Date('2015-07-21T13:48:08.563Z')
                            }
                        ]
                    }
                },
                'emails' : [
                    {
                        'address' : 'admin@example.com',
                        'verified' : false
                    }
                ],
                'completeness' : 27,
                'profile' : {
                    'name' : 'Admin User',
                    'settings' : {
                        'locale' : 'en',
                        'optionalDetailsCompleted' : true,
                        'email': {
                            'dailydigest': true,
                            'upper_mentioned_in_partup': true,
                            'invite_upper_to_partup_activity': true,
                            'invite_upper_to_network': true
                        },
                        'unsubscribe_email_token': 'Xr_FQVj16IQRwpoMxQOWgHMVr5z6Jd04wpvF00n6rK6'
                    },
                    'image' : 'CxEprGKNWo6HdrTdq',
                    'description' : null,
                    'tags' : [
                        'administration',
                        'finance'
                    ],
                    'location' : {
                        'city' : 'Utrecht',
                        'lat' : 52.0907373999999876,
                        'lng' : 5.1214200999999999,
                        'place_id' : 'ChIJNy3TOUNvxkcR6UqvGUz8yNY',
                        'country' : 'Netherlands'
                    },
                    'facebook_url' : null,
                    'twitter_url' : null,
                    'instagram_url' : null,
                    'linkedin_url' : null,
                    'phonenumber' : null,
                    'website' : '',
                    'skype' : null
                },
                'status' : {
                    'online' : true,
                    'lastLogin' : {
                        'date' : new Date('2015-07-21T13:48:03.623Z'),
                        'ipAddr' : '127.0.0.1',
                        'userAgent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36'
                    },
                    'idle' : false
                },
                'registered_emails' : [
                    {
                        'address' : 'admin@example.com',
                        'verified' : false
                    }
                ],
                'logins' : [
                    new Date('2015-07-21T13:48:03.641Z')
                ],
                'roles' : ['admin'],
                'networks' : [
                    'nqBnE8nSLasaapXXS',
                    'kRCjWDBkKru3KfsjW',
                    'wfCv4ZdPe5WNT4xfg',
                    'ibn27M3ePaXhmKzWq'
                ],
                'participation_score' : 2,
                'flags': {
                    'dailyDigestEmailHasBeenSent': false
                }
            });

            Meteor.users.insert({
                '_id' : 'a7qcp5RHnh5rfaeW9',
                'createdAt' : new Date('2015-07-21T14:11:01.053Z'),
                'services' : {
                    'password' : {
                        'bcrypt' : '$2a$10$nytjhtAbBUXe1Td8LrVJ4.jJa/lE62riuDM/dm79f3fqfeuZo2xNG'
                    },
                    'resume' : {
                        'loginTokens' : [
                            {
                                'when' : new Date('2015-07-21T14:11:01.061Z'),
                                'hashedToken' : 'QR5jRUOgOYNkrUZNjPdYicokC8hggzWimey9ccMMSG8='
                            }
                        ]
                    },
                    'email' : {
                        'verificationTokens' : [
                            {
                                'token' : 'X0BHuAeVNCWozOenCCTdXltEXE1kPB0VZBriz39Src4',
                                'address' : 'judy@example.com',
                                'when' : new Date('2015-07-21T14:11:06.055Z')
                            }
                        ]
                    }
                },
                'emails' : [
                    {
                        'address' : 'judy@example.com',
                        'verified' : false
                    }
                ],
                'completeness' : 27,
                'profile' : {
                    'name' : 'Judy Partup',
                    'settings' : {
                        'locale' : 'en',
                        'optionalDetailsCompleted' : true,
                        'email': {
                            'dailydigest': true,
                            'upper_mentioned_in_partup': true,
                            'invite_upper_to_partup_activity': true,
                            'invite_upper_to_network': true
                        },
                        'unsubscribe_email_token': 'WiYdZ-AoYintHgYofjIlOyWTsP8f2oNKLhh3jhhpIdN'
                    },
                    'image' : 'bMTGT9oSDGzxCL3r4',
                    'description' : null,
                    'tags' : [
                        'design',
                        'ux',
                        'photography',
                        'nonprofit'
                    ],
                    'location' : {
                        'city' : 'Maastricht',
                        'lat' : 50.8513682000000031,
                        'lng' : 5.6909725000000000,
                        'place_id' : 'ChIJnwZBWOzpwEcRbqi-zHuV61M',
                        'country' : 'Netherlands'
                    },
                    'facebook_url' : null,
                    'twitter_url' : null,
                    'instagram_url' : null,
                    'linkedin_url' : null,
                    'phonenumber' : null,
                    'website' : '',
                    'skype' : null
                },
                'status' : {
                    'online' : true,
                    'lastLogin' : {
                        'date' : new Date('2015-07-21T14:11:01.089Z'),
                        'ipAddr' : '127.0.0.1',
                        'userAgent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36'
                    },
                    'idle' : false
                },
                'registered_emails' : [
                    {
                        'address' : 'judy@example.com',
                        'verified' : false
                    }
                ],
                'logins' : [
                    new Date('2015-07-21T14:11:01.103Z')
                ],
                'supporterOf' : [
                    'gJngF65ZWyS9f3NDE'
                ],
                'participation_score' : 3,
                'pending_networks' : [
                    'wfCv4ZdPe5WNT4xfg'
                ],
                'networks' : [
                    'ibn27M3ePaXhmKzWq'
                ],
                'upperOf' : [
                    'vGaxNojSerdizDPjb'
                ],
                'flags': {
                    'dailyDigestEmailHasBeenSent': false
                }
            });
        }

    }
});
