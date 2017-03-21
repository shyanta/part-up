Meteor.startup(function () {
    if (process.env.NODE_ENV.match(/development|staging/)) {

        if (!Sectors.find().count()) {

            Sectors.insert({
                '_id': '9oNQGxTCKqvsTADnl',
                'name': 'Cultuur',
                'phrase_key': 'sector-culture'
            });
            Sectors.insert({
                '_id': '2RmvKkMc2gPgZnp1U',
                'name': 'Dienstverlening',
                'phrase_key': 'sector-service'
            });
            Sectors.insert({
                '_id': 'kJxHQtMKoLsOKaoUh',
                'name': 'Energie',
                'phrase_key': 'sector-energy'
            });
            Sectors.insert({
                '_id': 'olHytjJtx28UQL0sx',
                'name': 'Food & Drink',
                'phrase_key': 'sector-food-drink'
            });
            Sectors.insert({
                '_id': 'FhapMhLSOHcCCbPfO',
                'name': 'Finance',
                'phrase_key': 'sector-finance'
            });
            Sectors.insert({
                '_id': 'xPqmVC0HXZSonoTXB',
                'name': 'IT',
                'phrase_key': 'sector-it'
            });
            Sectors.insert({
                '_id': 'amBl1EcGQbS1D4yGD',
                'name': 'Maatschappij',
                'phrase_key': 'sector-society'
            });
            Sectors.insert({
                '_id': 'GKrqvl5EPLuh7PpSm',
                'name': 'Makers',
                'phrase_key': 'sector-makers'
            });
            Sectors.insert({
                '_id': 'nzlTJheV0FyyQOXsj',
                'name': 'Ondernemen',
                'phrase_key': 'sector-ondernemen'
            });
            Sectors.insert({
                '_id': 'cK2VJSFpyqMY01jc5',
                'name': 'Onderwijs',
                'phrase_key': 'sector-education'
            });
            Sectors.insert({
                '_id': 'vg9lIhHdym1a2NXNw',
                'name': 'Overheid',
                'phrase_key': 'sector-government'
            });
            Sectors.insert({
                '_id': '73Nx9bizIW1IlYxs6',
                'name': 'Sport',
                'phrase_key': 'sector-sport'
            });
            Sectors.insert({
                '_id': 'MFBPA6m09F2Qi0jGA',
                'name': 'Vervoer',
                'phrase_key': 'sector-transport'
            });
            Sectors.insert({
                '_id': 'a0AvnFFexUtOho2FJ',
                'name': 'Water',
                'phrase_key': 'sector-water'
            });
            Sectors.insert({
                '_id': 'EK44EKqmXHAMWvNEp',
                'name': 'Zorg',
                'phrase_key': 'sector-healthcare'
            });
        }
    }
});
