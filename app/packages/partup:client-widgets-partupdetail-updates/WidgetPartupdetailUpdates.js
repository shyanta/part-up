// temp reactive var until mongo implementation
var updatesVar = new ReactiveVar;
var stubUser = {
    profile: {
        name: 'Jesse de Vries',
        image: {
            url: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p320x320/10372513_10152630117689315_2823570313206588958_n.jpg?oh=e76400243d7ed2678ba0d74edd6640b1&oe=55B4CF02&__gda__=1437886258_2a6463042ac4dcef71cdbee34d6c55c7'
        }
    }
};
updatesVar.set([
    {
        _id: '98234bwef',
        user: stubUser,
        created_at: new Date(),
        type: 'anticontract_signed',
        data: {},
        comments: [
            {
                author: stubUser,
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet obcaecati cumque aliquam, corporis dolorum ab, quam totam recusandae culpa hic!'
            },
            {
                author: stubUser,
                content: 'Lorem ipsum dolor sit amet'
            }
        ]
    },
    {
        _id: 'p9un4wf9',
        user: stubUser,
        created_at: new Date(1426949113548),
        type: 'new_supporter',
        data: {},
        comments: []
    },
    {
        _id: 'pieunrg9',
        user: stubUser,
        created_at: new Date(1426949113549),
        type: 'new_upper',
        data: {},
        comments: []
    },
    {
        _id: 'q0983b4f',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'new_tag',
        data: {
            tag: 'Design'
        },
        comments: []
    },
    {
        _id: '0s8dfkas',
        user: stubUser,
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
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'network_public',
        data: {},
        comments: []
    },
    {
        _id: '34ct3',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'network_private',
        data: {},
        comments: []
    },
    {
        _id: 'sdfsdr',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'changed_ending_date',
        data: {
            old_date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 40), // 40 days
            new_date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days
        },
        comments: []
    },
    {
        _id: '4by5r5y',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'changed_title',
        data: {
            title: 'Ontwikkelen huisstijl voor onze start-up'
        },
        comments: []
    },
    {
        _id: '67ijrtrsn',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'changed_description',
        data: {
            description: 'Wie helpt mij in een Part-up om een complete huisstijl te bedenken, ontwikkelen en uit te werken voor onze goed nieuwe start-up?'
        },
        comments: []
    },
    {
        _id: '34vta4t',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'changed_picture',
        data: {},
        comments: []
    },
    {
        _id: '57n68yl',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'partups_activities_added',
        data: {},
        comments: []
    },
    {
        _id: 'wc4AWTVA',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'partups_activities_changed',
        data: {},
        comments: []
    },
    {
        _id: '6RUTF7I',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'partups_activities_added_resource',
        data: {},
        comments: []
    },
    {
        _id: 'rtnr6nu',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'partups_activities_added_contribution',
        data: {},
        comments: []
    },
    {
        _id: 't34ebtn',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'changed_region',
        data: {},
        comments: []
    },
    {
        _id: 'wrebtsrnu',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'rated',
        data: {},
        comments: []
    },
    {
        _id: 'W4TVBSERY',
        user: stubUser,
        created_at: new Date(1426949113550),
        type: 'new_message',
        data: {},
        comments: []
    }
]);

/*************************************************************/
/* Widget functions */
/*************************************************************/
var getUpdates = function getUpdates () {
    var partupId = Router.current().params._id;

    // Get the option that is selected in the filter dropdown
    var option = Session.get('partial-dropdown-updates-actions.selected');

    return Updates.find({ partup_id: partupId }, { sort: { updated_at: -1 } }).map(function (update, idx) {
        update.arrayIndex = idx;
        return update;
    }).filter(function (update, idx) {
        if (option === 'messages') {
            return update.type && update.type.indexOf('message') > -1;
        }

        return true;
    });
};

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdates.helpers({

    'updates': function helperUpdates () {
        // return updatesVar.get(); // temp reactive var until mongo implementation
        return getUpdates();
    },

    // temp reactive var until mongo implementation
    'reactiveUpdatesVar': function helperReactiveUpdatesVar () {
        return getUpdates();
    },

    'anotherDay': function helperAnotherday (update) {
        var TIME_FIELD = 'created_at';

        var updates = getUpdates(); //updatesVar.get(); // getUpdates()
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
    'click [data-newmessage]': function openNewMessagePopup(event, template){
        Partup.ui.popup.open();
    }
})
