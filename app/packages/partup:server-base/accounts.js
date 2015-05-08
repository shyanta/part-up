Accounts.onCreateUser(function(options, user) {
    var imagePath;
    var profile = options.profile;

    var liData = mout.object.get(user, 'services.linkedin');
    var fbData = mout.object.get(user, 'services.facebook');

    user.emails = user.emails || [];

    if (! liData && ! fbData) {
        Meteor.setTimeout(function () {
            Accounts.sendVerificationEmail(user._id);
        }, 5000);
    }

    if (liData) {
        profile = {
            name: liData.firstName + ' ' + liData.lastName,
            firstname: liData.firstName,
            lastname: liData.lastName,
            location: liData.location.name,
            settings: {
                locale: 'en'
            }
        };
        imagePath = liData.pictureUrl;
        user.emails.push({ address: liData.emailAddress, verified: true });
    }

    if (fbData) {
        profile = {
            name: fbData.name,
            firstname: fbData.first_name,
            lastname: fbData.last_name,
            gender: fbData.gender,
            settings: {
                locale: Partup.helpers.parseLocale(fbData.locale)
            }
        };
        imagePath = 'https://graph.facebook.com/' + fbData.id + '/picture?width=750';
        user.emails.push({ address: fbData.email, verified: true });
    }

    try {
        var image = new FS.File();
        image.attachData(imagePath);
        image.name(user.id + '.jpg', { save: false });

        var savedImage = Images.insert(image);
        profile.image = savedImage._id;
    } catch (error) {
        Log.error(error.message);
    }

    user.profile = profile;

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
    if (user.emails && user.emails.length) {
        return user.emails[0].address;
    }

    return mout.object.get(user, 'services.linkedin.emailAddress') ||
        mout.object.get(user, 'services.facebook.email') ||
        false;
}
