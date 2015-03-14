Meteor.methods({

    'collections.partups.insert': function (data) {
        Event.emit('collections.partups.insert', data);
    }

});