var placeholders = {
    'name': function() {
        return __('pages-modal-register-signup-form-name-placeholder');
    },
    'email': function() {
        return __('pages-modal-register-signup-form-email-placeholder');
    },
    'password': function() {
        return __('pages-modal-register-signup-form-password-placeholder');
    },
    'confirmPassword': function() {
        return __('pages-modal-register-signup-form-confirmPassword-placeholder');
    },
    'network': function() {
        return __('pages-modal-register-signup-form-network-placeholder');
    }
};

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_register_signup.helpers({
    formSchema: Partup.schemas.forms.registerRequired,
    placeholders: placeholders,
    totalNumberOfUppers: function() {
        var count = Counts.get('users');
        if (count)
            return count + 1;
        else
            return '';
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_register_signup.events({
    'click [data-signupfacebook]': function(event) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function(error) {

            if (error) {
                Partup.client.notify.error(__('pages-modal-register-signup-error_' + error.reason));
                return;
            }

            var partupId = Session.get('partup_access_token_for_partup');
            var partupAccessToken = Session.get('partup_access_token');
            if (partupId && partupAccessToken) {
                Meteor.call('partups.convert_access_token_to_invite', partupId, partupAccessToken);
            }

            var networkSlug = Session.get('network_access_token_for_network');
            var networkAccessToken = Session.get('network_access_token');
            if (networkSlug && networkAccessToken) {
                Meteor.call('networks.convert_access_token_to_invite', networkSlug, networkAccessToken);
            }

            analytics.track('User registered', {
                userId: Meteor.user()._id,
                method: 'facebook'
            });

            Router.go('register-details');
        });
    },
    'click [data-signuplinkedin]': function(event) {
        Meteor.loginWithLinkedin({
            requestPermissions: ['r_emailaddress']
        }, function(error) {

            if (error) {
                Partup.client.notify.error(__('pages-modal-register-signup-error_' + error.reason));
                return false;
            }

            var partupId = Session.get('partup_access_token_for_partup');
            var partupAccessToken = Session.get('partup_access_token');
            if (partupId && partupAccessToken) {
                Meteor.call('partups.convert_access_token_to_invite', partupId, partupAccessToken);
            }

            var networkSlug = Session.get('network_access_token_for_network');
            var networkAccessToken = Session.get('network_access_token');
            if (networkSlug && networkAccessToken) {
                Meteor.call('networks.convert_access_token_to_invite', networkSlug, networkAccessToken);
            }

            analytics.track('User registered', {
                userId: Meteor.user()._id,
                method: 'linkedin'
            });

            var locale = Partup.helpers.parseLocale(navigator.language || navigator.userLanguage);

            Meteor.call('settings.update', {locale: locale}, function(err) {
                if (err) {
                    Partup.client.notify.error(__('pages-modal-register-signup-error_' + Partup.client.strings.slugify('failed to update locale')));
                    return false;
                }

                Router.go('register-details');
            });
        });
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    'pages-modal-register-signupForm': {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            var locale = Partup.helpers.parseLocale(navigator.language || navigator.userLanguage);

            Accounts.createUser({
                email: insertDoc.email,
                password: insertDoc.password,
                profile: {
                    name: insertDoc.name,
                    network: insertDoc.network,
                    settings: {
                        locale: locale,
                        optionalDetailsCompleted: false,
                        email: {
                            dailydigest: true,
                            upper_mentioned_in_partup: true,
                            invite_upper_to_partup_activity: true,
                            invite_upper_to_network: true,
                            partup_created_in_network: true,
                            partups_networks_new_pending_upper: true,
                            partups_networks_accepted: true
                        },
                        unsubscribe_email_token: Random.secret()
                    }
                }
            }, function(error) {

                // Error cases
                if (error && error.message) {
                    switch (error.message) {
                        case 'Email already exists [403]':
                            Partup.client.forms.addStickyFieldError(self, 'email', 'emailExists');
                            break;
                        default:
                            Partup.client.notify.error(__('pages-modal-register-signup-error_' + error.reason));
                    }
                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return false;
                }

                // Success
                self.done();

                var partupId = Session.get('partup_access_token_for_partup');
                var partupAccessToken = Session.get('partup_access_token');
                if (partupId && partupAccessToken) {
                    Meteor.call('partups.convert_access_token_to_invite', partupId, partupAccessToken);
                }

                var networkSlug = Session.get('network_access_token_for_network');
                var networkAccessToken = Session.get('network_access_token');
                if (networkSlug && networkAccessToken) {
                    Meteor.call('networks.convert_access_token_to_invite', networkSlug, networkAccessToken);
                }

                analytics.track('User registered', {
                    userId: Meteor.user()._id,
                    method: 'email'
                });

                Router.go('register-details');
            });

            return false;
        }
    }
});
