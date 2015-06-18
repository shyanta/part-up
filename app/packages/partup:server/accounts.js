Accounts.onCreateUser(function(options, user) {
    var imageUrl;
    var profile = options.profile;

    var liData = mout.object.get(user, 'services.linkedin');
    var fbData = mout.object.get(user, 'services.facebook');

    user.emails = user.emails || [];

    if (!liData && !fbData) {
        Meteor.setTimeout(function() {
            Accounts.sendVerificationEmail(user._id);
        }, 5000);
    }

    if (liData) {
        var location = {};

        if (liData.location && liData.location.name) {
            var locationParts = liData.location.name.split(',');

            if (locationParts.length === 2) {
                location.city = locationParts[0].trim().replace(' Area', '');
                location.country = locationParts[1].trim();
            }
        }

        profile = {
            firstname: liData.firstName,
            lastname: liData.lastName,
            linkedin_id: liData.id,
            location: location,
            name: liData.firstName + ' ' + liData.lastName,
            settings: {
                locale: 'en',
                optionalDetailsCompleted: false
            }
        };

        imageUrl = liData.pictureUrl;
        user.emails.push({address: liData.emailAddress, verified: true});
    }

    if (fbData) {
        profile = {
            facebook: fbData.id,
            firstname: fbData.first_name,
            gender: fbData.gender,
            lastname: fbData.last_name,
            name: fbData.name,
            settings: {
                locale: Partup.helpers.parseLocale(fbData.locale),
                optionalDetailsCompleted: false
            }
        };

        imageUrl = 'https://graph.facebook.com/' + fbData.id + '/picture?width=750';
        user.emails.push({address: fbData.email, verified: true});
    }

    try {
        var result = HTTP.get(imageUrl, {'npmRequestOptions': {'encoding': null}});
        var buffer = new Buffer(result.content, 'binary');

        var ref = new FS.File();
        ref.attachData(buffer, {type: 'image/jpeg'});
        ref.name(user._id + '.jpg');

        var image = Images.insert(ref);
        profile.image = image._id;
    } catch (error) {
        Log.error(error.message);
    }

    if (!profile.image) {
        var images = Images.find({'meta.default_profile_picture': true}).fetch();
        image = mout.random.choice(images);
        profile.image = image._id;
        console.log('Setting user image', image);
    }

    user.completeness = 0;

    user.profile = profile;

    return user;
});

Accounts.validateNewUser(function(user) {
    var emailAddress = findPossibleEmailAddresses(user);

    var socialUser = Meteor.users.findOne({'emails.address': emailAddress});
    var passwordUser = Meteor.users.findOne({'registered_emails.address': emailAddress});

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
