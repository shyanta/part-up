/**
 * Generate a donation Activity on Partup creation.
 */
Event.on('partups.inserted', function (userId, partup) {
    var upper = Meteor.users.findOne({_id: userId});
    var locale = mout.object.get(upper, 'profile.settings.locale') || 'en';

    var donationActivity = {
        created_at: new Date(),
        description: __('activities-donation-description', { lng: locale }),
        donation: true,
        name: __('activities-donation-name', { lng: locale }),
        partup_id: partup._id,
        upper_id: userId
    };

    Activities.insert(donationActivity);
});
