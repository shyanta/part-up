Template.registerHelper("equals", function (a, b) {
    return (a == b);
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesPartupDetailUpdates.helpers({

    'updates': function helperUpdates () {

        // Stub data:
        return [
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
                time: '2015-03-23T14:39:41.711Z',
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
                time: '2015-03-23T14:39:41.711Z',
                comments: [
                    //
                ]
            }
        ];
    },

    'updateTime': function(input) {
        // todo
        return '10 min';
    }

});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesPartupDetailUpdates.events({
    //
});