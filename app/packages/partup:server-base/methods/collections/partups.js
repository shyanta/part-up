Meteor.methods({

    'collections.partups.insert': function (data) {
	// Authorized?

        Event.emit('collections.partups.insert', data);
    }

});