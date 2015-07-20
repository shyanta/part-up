/**
 * Generic Email Configuration
 */
Accounts.emailTemplates.from = 'Part-up <noreply@part-up.com>';

/**
 * Password Reset Email
 */
Accounts.emailTemplates.resetPassword.subject = function(user) {
    var locale = getUserLocale(user);

    return TAPi18n.__('emails-reset-password-subject', {}, locale);
};
Accounts.emailTemplates.resetPassword.html = function(user, url) {
    var locale = getUserLocale(user);

    SSR.compileTemplate('resetPasswordEmail', Assets.getText('emails/ResetPassword.' + locale + '.html'));

    return SSR.render('resetPasswordEmail', {user: user, url: url.replace('/#', '')});
};

/**
 * Verify Email
 */
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    var locale = getUserLocale(user);

    return TAPi18n.__('emails-verify-account-subject', {}, locale);
};
Accounts.emailTemplates.verifyEmail.html = function(user, url) {
    var locale = getUserLocale(user);

    SSR.compileTemplate('verifyAccountEmail', Assets.getText('emails/VerifyAccount.' + locale + '.html'));

    return SSR.render('verifyAccountEmail', {user: user, url: url.replace('/#', '')});
};

/**
 * Helpers
 */
var getUserLocale = function(user) {
    var locale = mout.object.get(user, 'profile.settings.locale') || 'nl';

    if (!mout.object.has(TAPi18n.getLanguages(), locale)) {
        locale = 'nl';
    }

    return locale;
};
