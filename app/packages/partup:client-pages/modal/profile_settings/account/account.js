var placeholders = {
    'currentPassword': function() {
        return __('modal-profilesettings-account-currentpassword');
    },
    'password': function() {
        return __('modal-profilesettings-account-password');
    },
    'confirmPassword': function() {
        return __('modal-profilesettings-account-confirmpassword');
    }
};
Template.modal_profile_settings_account.helpers({
    placeholders: placeholders,
    selectedLanguage: function() {
        return Partup.client.language.current.get();
    }
});
/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_profile_settings_account.events({
    'input [data-translate]': function clickTranslate (event, template) {
        var language = $(event.currentTarget).val();
        Partup.client.language.change(language);
    }
});
