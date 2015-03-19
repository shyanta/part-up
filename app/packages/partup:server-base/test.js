// Accounts.createUser({
//     username: 'bryantebeek',
//     password: 'test',
//     email: 'bryantebeek@gmail.com',
//     profile: {
//         name: 'Bryan te Beek'
//     }
// });

// console.log(Meteor.user());

Meteor.call('collections.partups.insert', { name: 'New Partup!', uppers: ['nick', 'take', 'jesse'] }, function (error, id) {
    var partup = Partups.findOne({ _id: id });

    if (partup) {
        Meteor.call('collections.partups.supporters.insert', partup._id);
        // Meteor.call('collections.partups.supporters.remove', partup._id);

        Meteor.call('collections.partups.update', partup._id, { name: 'Changed Partup!' });
        // Meteor.call('collections.partups.remove', partup._id);
    }
});
