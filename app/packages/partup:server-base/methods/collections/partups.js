Meteor.methods({

    'collections.partups.insert': function (data) {
        // Authorized?

        Event.emit('collections.partups.insert', data);
    },

    'collections.partups.remove': function (partupId) {
        // Authorized?

        Event.emit('collections.partups.remove', partupId);
    }

});