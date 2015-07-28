Template.modal_profile_settings.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        var return_route = 'profile-settings';

        if (Intent.exists('profile-settings-details')) {
            return_route = 'profile-settings-details';
        } else if (Intent.exists('profile-settings-email')) {
            return_route = 'profile-settings-email';
        }

        Intent.return(return_route, {
            fallback_route: {
                name: 'profile-upper-partups',
                params: {
                    _id: Meteor.userId()
                }
            }
        });
    }
});
