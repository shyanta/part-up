var locales = Object.keys(TAPi18n.getLanguages());
var formats = ['html', 'text'];
var templates = ['VerifyAccount', 'ResetPassword'];
var templateName;
var templateFile;

/**
 * Pre-compile all template combinations so it only happens once
 */
templates.forEach(function(tplName) {
    locales.forEach(function(locale) {
        formats.forEach(function(format) {
            templateName = 'email' + tplName + '.' + locale + '.' + format;
            templateFile = 'emails/' + tplName + '.' + locale + '.' + format;
            SSR.compileTemplate(templateName, Assets.getText(templateFile));
        });
    });
});


/**
 * Generic Email Configuration
 */
Accounts.emailTemplates.from = 'Part-up <noreply@part-up.com>';

/**
 * Password Reset Email
 */
var resetEmail = function(format) {
    return function(user, url) {
        var locale = User(user).getLocale();
        var tplName = 'emailResetPassword.' + locale + '.' + format;
        var tplData = {
            user: user,
            url: url.replace('/#', '')
        };

        return SSR.render(tplName, tplData);
    };
};
Accounts.emailTemplates.resetPassword.subject = function(user) {
    var locale = User(user).getLocale();

    return TAPi18n.__('emails-reset-password-subject', {}, locale);
};
Accounts.emailTemplates.resetPassword.html = resetEmail('html');
Accounts.emailTemplates.resetPassword.text = resetEmail('text');

/**
 * Verify Email
 */
var verifyEmail = function(format) {
    return function(user, url) {
        var locale = User(user).getLocale();
        var tplName = 'emailVerifyAccount.' + locale + '.' + format;
        var tplData = {
            user: user,
            url: url.replace('/#', ''),
            count: Meteor.users.find().count() - 1
        };

        return SSR.render(tplName, tplData);
    };
};
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    var locale = User(user).getLocale();

    return TAPi18n.__('emails-verify-account-subject', {}, locale);
};
Accounts.emailTemplates.verifyEmail.html = verifyEmail('html');
Accounts.emailTemplates.verifyEmail.text = verifyEmail('text');
