Accounts.onCreateUser(function(options, user) {
    var profile = options.profile;
    var services = user.services;

    user.profile = options.profile;

    if ('linkedin' in services) {
        var name = profile.firstName + ' ' + profile.lastName;
        user.profile = { name: name };
    }

    Event.emit('users.inserted', user);

    return user;
});

Accounts.validateNewUser(function (user) {
    if(Meteor.users.findOne({email: user.email})) {
        throw new Meteor.Error(403, "Email already exists");
    }
});