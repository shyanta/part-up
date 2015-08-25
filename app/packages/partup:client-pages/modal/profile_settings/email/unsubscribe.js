Template.modal_profile_settings_email_unsubscribe.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        Intent.return('home');
    }
});
