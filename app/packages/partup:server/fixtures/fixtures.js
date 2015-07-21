Meteor.startup(function() {
    if (process.env.NODE_ENV.match(/development|staging/)) {

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
