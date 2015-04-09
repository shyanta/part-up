Accounts.onCreateUser(function(options, user) {
    var profile = options.profile;

    user.profile = options.profile;

    if ('linkedin' in user.services) {
        user.profile = {};
        user.profile.name = profile.firstName + ' ' + profile.lastName;

        try {
            var image = Images.insert(profile.pictureUrl);
            user.profile.image = image._id;
        } catch (error) {
            Log.error(error.message);
        }
    }

    if ('facebook' in user.services) {
        var data = user.services.facebook;

        try {
            var image = Images.insert('https://graph.facebook.com/' + data.id + '/picture?width=750');
            user.profile.image = image._id;
        } catch (error) {
            Log.error(error.message);
        }
    }

    return user;
});

Accounts.validateNewUser(function (user) {
    var emailAddress = findPossibleEmailAddresses(user);

    var socialUser = Meteor.users.findOne({ 'emails.address': emailAddress });
    var passwordUser = Meteor.users.findOne({ 'registered_emails.address': emailAddress });

    if (socialUser || passwordUser) {
        throw new Meteor.Error(403, 'Email already exists');
    }

    Event.emit('users.inserted', user);

    return true;
});

function findPossibleEmailAddresses(user) {
    if(user.emails && user.emails.length > 0) {
        return user.emails[0].address;
    }
    if(user.services && user.services.linkedin) {
        return user.services.linkedin.emailAddress;
    }
    if(user.services && user.services.facebook) {
        return user.services.facebook.email;
    }
    return false;
}
