Accounts.onCreateUser(function(options, user) {
    var profile = options.profile;
    var services = user.services;

    user.profile = options.profile;

    if ('linkedin' in services) {
        user.profile = {};
        user.profile.name = profile.firstName + ' ' + profile.lastName;

        try {
            var image = Images.insert(profile.pictureUrl);
            user.profile.image = image._id;
        } catch (error) { }
    }

    if ('facebook' in user.services) {
        var data = user.services.facebook;

        try {
            var image = Images.insert('https://graph.facebook.com/' + data.id + '/picture?width=1500');
            user.profile.image = image._id;
        } catch (error) { }
    }

    return user;
});

Accounts.validateNewUser(function (user) {
    if (Meteor.users.findOne({ email: user.email })) {
        throw new Meteor.Error(403, 'Email already exists');
    }

    Event.emit('users.inserted', user);

    return true;
});
