var unsubscribeAllEmails = function(token) {
    Meteor.call('settings.email_unsubscribe_all', token, function(error, result) {
        if (error) {
            Partup.client.notify.error(__('modal-profilesettings-email-updateerror-disabled-all'));
            return;
        }
        Partup.client.notify.success(__('modal-profilesettings-email-updatesuccess-disabled-all'));
        Meteor.defer(function() {
            Router.go('home');
        });
    });
};
Template.modal_profile_settings_email_unsubscribe.onRendered(function() {
    var template = this;

    Partup.client.prompt.confirm({
        title: __('pages-app-emailsettings-confirmation-title'),
        message: __('pages-app-emailsettings-confirmation-message'),
        confirmButton: __('pages-app-emailsettings-confirmation-confirm-button'),
        cancelButton: __('pages-app-emailsettings-confirmation-cancel-button'),
        onConfirm: function() {
            var token = template.data.token;
            unsubscribeAllEmails(token);
        },
        onCancel: function() {
            Router.go('home');
        }
    });
});

Template.modal_profile_settings_email_unsubscribe.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        Router.go('home');
    }
});

