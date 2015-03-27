// temp reactive var until mongo implementation
var updatesVar = new ReactiveVar;
updatesVar.set([
    {
        _id: '98234bwef',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(),
        type: 'anticontract_signed',
        data: {},
        comments: [
            {
                user: {
                    fullname: 'Leon Smit'
                },
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet obcaecati cumque aliquam, corporis dolorum ab, quam totam recusandae culpa hic!'
            },
            {
                user: {
                    fullname: 'Jesse de Vries'
                },
                content: 'Lorem ipsum dolor sit amet'
            }
        ]
    },
    {
        _id: 'p9un4wf9',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/0a7/057/33f4a9e.jpg',
            fullname: 'Leon Smit',
        },
        created_at: new Date(1426949113548),
        type: 'new_supporter',
        data: {},
        comments: []
    },
    {
        _id: 'pieunrg9',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/0a7/057/33f4a9e.jpg',
            fullname: 'Leon Smit',
        },
        created_at: new Date(1426949113549),
        type: 'new_upper',
        data: {},
        comments: []
    },
    {
        _id: 'q0983b4f',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/0a7/057/33f4a9e.jpg',
            fullname: 'Leon Smit',
        },
        created_at: new Date(1426949113550),
        type: 'new_tag',
        data: {
            tag: 'Design'
        },
        comments: []
    },
    {
        _id: '0s8dfkas',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'changed_tag',
        data: {
            old_tag: 'Huisstyle',
            new_tag: 'Huisstijl'
        },
        comments: []
    },
    {
        _id: '54twerv',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'network_public',
        data: {},
        comments: []
    },
    {
        _id: '34ct3',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'network_private',
        data: {},
        comments: []
    },
    {
        _id: 'sdfsdr',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'changed_ending_date',
        data: {},
        comments: []
    },
    {
        _id: '4by5r5y',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'changed_title',
        data: {},
        comments: []
    },
    {
        _id: '67ijrtrsn',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'changed_description',
        data: {},
        comments: []
    },
    {
        _id: '34vta4t',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'changed_picture',
        data: {},
        comments: []
    },
    {
        _id: '57n68yl',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'new_activity',
        data: {},
        comments: []
    },
    {
        _id: 'wc4AWTVA',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'changed_activity',
        data: {},
        comments: []
    },
    {
        _id: '6RUTF7I',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'added_resource_to_activity',
        data: {},
        comments: []
    },
    {
        _id: 'rtnr6nu',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'added_contribution_to_activity',
        data: {},
        comments: []
    },
    {
        _id: 't34ebtn',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'changed_region',
        data: {},
        comments: []
    },
    {
        _id: 'wrebtsrnu',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'rated',
        data: {},
        comments: []
    },
    {
        _id: 'W4TVBSERY',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/0b2/1b0/1d80474.jpg',
            fullname: 'Jesse de Vries',
        },
        created_at: new Date(1426949113550),
        type: 'new_message',
        data: {},
        comments: []
    }
]);

/*************************************************************/
/* Widget functions */
/*************************************************************/
// var getUpdates = function getUpdates () {

//     // Real data
//     var partupId = Router.current().params._id;

//     return Updates.find({ partup_id: partupId }).map(function (update, idx) {
//         update.arrayIndex = idx;
//         return update;
//     });

// };

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdates.helpers({

    'updates': function helperUpdates () {
        return updatesVar.get(); // temp reactive var until mongo implementation
        return getUpdates();
    },

    // temp reactive var until mongo implementation
    'reactiveUpdatesVar': function helperReactiveUpdatesVar () {
        return updatesVar;
    },

    'anotherDay': function helperAnotherday (update) {
        var TIME_FIELD = 'created_at';
        
        var updates = updatesVar.get(); // getUpdates()
        var currentIndex = lodash.findIndex(updates, update);
        var previousUpdate = updates[currentIndex - 1];
        var previousMoment = moment();

        if (previousUpdate) {
            previousMoment = moment(previousUpdate[TIME_FIELD]);
        }

        var currentMoment = moment(update[TIME_FIELD]);

        return previousMoment.diff(currentMoment) > 24 * 60 * 60 * 1000;
    }

});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailUpdates.events({
    //
});
