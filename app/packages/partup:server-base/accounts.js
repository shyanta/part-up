Accounts.onCreateUser(function(options, user) {
    var profile = options.profile;
    var services = user.services;

    user.profile = options.profile;

    if ('linkedin' in services) {
        var name = profile.firstName + ' ' + profile.lastName;
        user.profile = { name: name };
    }

    return user;
});
