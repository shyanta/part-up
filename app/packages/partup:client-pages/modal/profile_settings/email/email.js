/**
 * Render profile email settings
 */
Template.modal_profile_settings_email.onCreated(function() {
});

Template.modal_profile_settings_email.helpers({
    'email': function() {
        var user = Meteor.user();
        return mout.object.get(user, 'profile.settings.email');
    }
});

function saveEmailSettings(settingName, settingValue) {
    var data = {
        email: {}
    }
    data.email[settingName] = settingValue;
    
    Meteor.call('settings.update', data, function(error) {
        if (error) {
            Partup.client.notify.error(error.reason);
            return;
        }
        Partup.client.notify.success(__('modal-profilesettings-email-updatesuccess'));
    });
}

Template.modal_profile_settings_email.events({
    'click [data-enable]': function(e, template) {
        var settingName = $(e.currentTarget).data('enable');
        saveEmailSettings(settingName, true);
    },
    'click [data-disable]': function(e, template) {
        var settingName = $(e.currentTarget).data('disable');
        saveEmailSettings(settingName, false);
    }
});
