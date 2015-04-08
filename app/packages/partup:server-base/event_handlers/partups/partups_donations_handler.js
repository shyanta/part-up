/**
 * Generate a donation Activity on Partup creation.
 */
Event.on('partups.inserted', function (partup) {
    var donationActivity = {
        created_at: new Date(),
        description: __('activities-donation-description'),
        donation: true,
        name: __('activities-donation-name'),
        partup_id: partup._id,
        upper_id: Meteor.user()._id
    };

    Activities.insert(donationActivity);
});
