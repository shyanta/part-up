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
                        'optionalDetailsCompleted' : true
                    },
                    'image' : 'BPyL2zAyQ8b7bewEu',
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
                'name' : 'Default User',
                'settings' : {
                    'locale' : 'en',
                    'optionalDetailsCompleted' : false
                },
                'image' : 'BPyL2zAyQ8b7bewEu'
            });

            Meteor.users.insert({
                '_id' : 'K5c5M4Pbdg3B82wQI',
                'createdAt' : new Date('2015-07-21T13:43:28.401Z'),
                'services' : {
                    'password' : {
                        'bcrypt' : '$2a$10$1G7V9d0ueuT..jbsgb8xTemb1PjB7fQFi6hhPOK8ylHI59caUQzkG'
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
                        'optionalDetailsCompleted' : true
                    },
                    'image' : 'nL2MYYXJ3eFeb2GYq',
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
                'name' : 'John Partup',
                'settings' : {
                    'locale' : 'en',
                    'optionalDetailsCompleted' : false
                },
                'image' : 'nL2MYYXJ3eFeb2GYq'
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
                        'optionalDetailsCompleted' : true
                    },
                    'image' : 'hJzq4Ga9TtCbdxBLr',
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
                'name' : 'Admin User',
                'settings' : {
                    'locale' : 'en',
                    'optionalDetailsCompleted' : false
                },
                'image' : 'hJzq4Ga9TtCbdxBLr'
            });

        }

    }
})
