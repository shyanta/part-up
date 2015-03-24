Template.registerHelper("equals", function (a, b) {
    return (a == b);
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesPartupDetailUpdates.helpers({

    'updates': function helperUpdates () {

        var DATA = [
            {
                id: 'j1hb233hb2j3h4',
                user: {
                    fullname: 'Erik Soonieus',
                    profile_url: '',
                    avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/1/005/0ac/377/3229da5.jpg'
                },
                title: 'Anti-contract getekend',
                type: 'signed_anticontract',
                data: {
                    //
                },
                time: new Date(1427191514721),
                comments: [
                    //
                ]
            },
            {
                id: '987asd987asda2',
                user: {
                    fullname: 'Jesse de Vries',
                    profile_url: '',
                    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg'
                },
                title: 'Omschrijving gewijzigd',
                type: 'changed_description',
                data: {
                    description: 'Wie helpt mij in een Part-up om een complete huisstijl te bedenken, ontwikkelen en uit te werken voor onze goed nieuwe start-up?'
                },
                time: new Date(1425184414721),
                comments: [
                    //
                ]
            }
        ];

        var indexify = function indexify (updates) {
            return _.map(updates, function (update, idx) {
                update.arrayIndex = idx;
                return update;
            });
        };

        // Stub data:
        return indexify(DATA);
    },

    'anotherDay': function (update, updates) {
        var previousUpdate = updates[update.arrayIndex - 1];
        var previousMoment = moment();
        if(previousUpdate) {
            previousMoment = moment(previousUpdate.time);
        }
        var currentMoment= moment(update.time);

        return previousMoment.diff(currentMoment) > 24 * 60 * 60 * 1000;
    }

});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesPartupDetailUpdates.events({
    //
});