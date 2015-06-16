if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        xdescribe('partup-detail sidebar', function() {
            var template;

            var partupStub = {
                '_id': 'LzDuAeoEtaPcxdeWW',
                'budget_hours': 13,
                'budget_money': null,
                'budget_type': 'hours',
                'created_at': '2015-05-28T12:05:07.142Z',
                'creator_id': 'rcuFvNy9xh8SJGM54',
                'description': 'notifications1',
                'end_date': '2015-05-25T00:00:00.000Z',
                'image': 'm5qAbhFgh7Zph8vvo',
                'location': {
                    'city': 'notifications3',
                    'country': null
                },
                'name': '441notifications123',
                'supporters': [
                    '123123',
                    '123124'
                ],
                'tags': [
                    'notifications2'
                ],
                'uppers': [
                    'rcuFvNy9xh8SJGM54',
                    'JwSJQRgXAKJav9t3Z'
                ]
            };

            var imageStub = {
                '_id': 'dWPwyjC55Cbw4YCZC',
                'collectionName': 'images',
                'copies': {
                    '1200x520': {
                        'createdAt': '2015-05-28T09:02:42.000Z',
                        'key': 'images-dWPwyjC55Cbw4YCZC-rcuFvNy9xh8SJGM54.jpg',
                        'name': 'rcuFvNy9xh8SJGM54.jpg',
                        'size': 35516,
                        'type': 'image/jpeg',
                        'updatedAt': '2015-05-28T09:02:42.000Z'
                    },
                    '360x360': {
                        'createdAt': '2015-05-28T09:02:42.000Z',
                        'key': 'images-dWPwyjC55Cbw4YCZC-rcuFvNy9xh8SJGM54.jpg',
                        'name': 'rcuFvNy9xh8SJGM54.jpg',
                        'size': 19235,
                        'type': 'image/jpeg',
                        'updatedAt': '2015-05-28T09:02:42.000Z'
                    },
                    'original': {
                        'createdAt': '2015-05-28T09:02:42.000Z',
                        'key': 'images-dWPwyjC55Cbw4YCZC-rcuFvNy9xh8SJGM54.jpg',
                        'name': 'rcuFvNy9xh8SJGM54.jpg',
                        'size': 116191,
                        'type': 'image/jpeg',
                        'updatedAt': '2015-05-28T09:02:42.000Z'
                    }
                },
                'createdByTransform': true,
                'original': {
                    'name': 'rcuFvNy9xh8SJGM54.jpg',
                    'size': 116191,
                    'type': 'image/jpeg'
                },
                'focuspoint': {
                    'x': 0,
                    'y': 0
                },
                'uploadedAt': '2015-05-28T09:02:42.112Z'
            };

            var usersStub = [
                {
                    '_id': 'rcuFvNy9xh8SJGM54',
                    'emails': [
                        {
                            'address': 'peterpeerdeman@gmail.com',
                            'verified': true
                        }
                    ],
                    'partups': [
                        'LzDuAeoEtaPcxdeWW',
                        'PyA8X8MDdWxddoYwo',
                        'Es7NkSEuLeNcuR8us',
                        'wqcAdBLJwKifTFeTG',
                        'TtwsyXeYLuyH7uzmH',
                        'Sy7z33uG3ZfpvmXwW'
                    ],
                    'profile': {
                        'description': 'nice',
                        'facebook': '10152855288668542',
                        'firstname': 'Peter',
                        'gender': 'male',
                        'image': 'dWPwyjC55Cbw4YCZC',
                        'instagram': null,
                        'lastname': 'Peerdeman',
                        'linkedin': null,
                        'location': {
                            'city': null,
                            'country': null
                        },
                        'name': 'Peter Peerdeman',
                        'phonenumber': null,
                        'settings': {
                            'locale': 'en',
                            'optionalDetailsCompleted': true
                        },
                        'skype': null,
                        'tags': [],
                        'twitter': null,
                        'website': ''
                    },
                    'status': {
                        'online': true
                    },
                    'supporterOf': [
                        'pLXgks2YuQF4WJDcw'
                    ],
                    'upperOf': [
                        'LzDuAeoEtaPcxdeWW',
                        'PyA8X8MDdWxddoYwo',
                        'Es7NkSEuLeNcuR8us',
                        'wqcAdBLJwKifTFeTG',
                        'TtwsyXeYLuyH7uzmH',
                        'Sy7z33uG3ZfpvmXwW'
                    ]
                },
                {
                    '_id': 'JwSJQRgXAKJav9t3Z',
                    'profile': {
                        'description': null,
                        'facebook': null,
                        'image': 'yTEe7Am6zrmYvha8p',
                        'instagram': null,
                        'linkedin': null,
                        'location': {
                            'city': null,
                            'country': null
                        },
                        'name': 'peerdemeeuw',
                        'phonenumber': null,
                        'settings': {
                            'locale': 'en',
                            'optionalDetailsCompleted': true
                        },
                        'skype': null,
                        'tags': [],
                        'twitter': null,
                        'website': ''
                    },
                    'status': {
                        'online': false
                    },
                    'supporterOf': [
                        'pLXgks2YuQF4WJDcw',
                        'PyA8X8MDdWxddoYwo',
                        'wqcAdBLJwKifTFeTG'
                    ],
                    'upperOf': [
                        'LzDuAeoEtaPcxdeWW',
                        'LzDuAeoEtaPcxdeWW'
                    ]
                }
            ];

            beforeEach(function() {
                template = document.createElement('div');
                var comp = Blaze.renderWithData(Template.app_partup_sidebar, {
                    partup: function() {return partupStub},
                    partupSupporters: function() {return usersStub},
                    partupUppers: function() {return usersStub},
                    partupCover: function() {return imageStub}
                });
                Blaze.insert(comp, template);
            });

            it('should contain partup name', function(done) {
                var title = $(template).find('h1').first();
                chai.expect(title.text()).to.contain('1notifications123');
                done();
            });

            it('should render uppers', function(done) {
                var uppersList = $(template).find('.pu-list-users').first();
                chai.expect(uppersList.children().length).to.be.above(0);
                done();
            });

            it('should count number of supporters', function(done) {
                var supportersTitle = $(template).find('.pu-sub-light h2').first();
                chai.expect(supportersTitle.text()).to.contain('Supporters (2)');
                done()
            });

        });
    });
}

