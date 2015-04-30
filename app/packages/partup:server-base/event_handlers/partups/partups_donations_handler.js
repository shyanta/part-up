/**
 * Generate a donation Activity on Partup creation.
 */
Event.on('partups.inserted', function (userId, partup) {
    var donationActivity = {
        created_at: new Date(),
        description: __('activities-donation-description', { lng: 'nl'}),
        donation: true,
        name: __('activities-donation-name', { lng: 'nl'}),
        partup_id: partup._id,
        upper_id: userId
    };

    Activities.insert(donationActivity);
});
