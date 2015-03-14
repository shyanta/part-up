Meteor.call('collections.partups.insert', { name: 'New Partup!' });

var partup = Partups.findOne();

Meteor.call('collections.partups.remove', partup._id);