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
        data: {
            //
        },
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
        type: 'anticontract_signed',
        data: {
            //
        },
        comments: [
            {
                user: {
                    fullname: 'Jesse de Vries'
                },
                content: 'Lorem ipsum dolor sit amet'
            }
        ]
    },
    {
        _id: 'pieunrg9',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/0a7/057/33f4a9e.jpg',
            fullname: 'Leon Smit',
        },
        created_at: new Date(1426949113549),
        type: 'anticontract_signed',
        data: {
            //
        },
        comments: []
    },
    {
        _id: 'q0983b4f',
        user: {
            avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/0a7/057/33f4a9e.jpg',
            fullname: 'Leon Smit',
        },
        created_at: new Date(1426949113550),
        type: 'anticontract_signed',
        data: {
            //
        },
        comments: [
            {
                user: {
                    fullname: 'Jesse de Vries'
                },
                content: 'Lorem ipsum dolor sit amet'
            }
        ]
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
