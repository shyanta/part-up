Template.modal_profile_settings.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        Intent.return('profile-settings', {
            fallback_route: {
                name: 'profile-upper-partups',
                params: {
                    _id: Meteor.userId()
                }
            }
        });
    }
});
