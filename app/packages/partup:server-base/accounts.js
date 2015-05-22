Accounts.onCreateUser(function(options, user) {
    var imageUrl;
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
            linkedin_id: liData.id,
            name: liData.firstName + ' ' + liData.lastName,
            firstname: liData.firstName,
            lastname: liData.lastName,
            location: liData.location.name,
            settings: {
                locale: 'en'
            }
        };
        imageUrl = liData.pictureUrl;
        user.emails.push({ address: liData.emailAddress, verified: true });
    }

    if (fbData) {
        profile = {
            facebook_id: fbData.id,
            name: fbData.name,
            firstname: fbData.first_name,
            lastname: fbData.last_name,
            gender: fbData.gender,
            settings: {
                locale: Partup.helpers.parseLocale(fbData.locale)
            }
        };
        imageUrl = 'https://graph.facebook.com/' + fbData.id + '/picture?width=750';
        user.emails.push({ address: fbData.email, verified: true });
    }

    try {
        var result = HTTP.get(imageUrl, { 'npmRequestOptions': { 'encoding': null } });
        var buffer = new Buffer(result.content, 'binary');

        var ref = new FS.File();
        ref.attachData(buffer, { type: 'image/jpeg' });
        ref.name(user._id + '.jpg');

        var image = Images.insert(ref);
        profile.image = image._id;
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
