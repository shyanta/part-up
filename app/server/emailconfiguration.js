/**
 * Generic Email Configuration
 */
Accounts.emailTemplates.from = 'Part-up <noreply@part-up.com>';

/**
 * Password Reset Email
 */
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return 'Reset Part-up password';
};
Accounts.emailTemplates.resetPassword.html = function (user, url) {
    return SSR.render('resetPasswordEmail', { user: user, url: url.replace('/#', '') });
};
SSR.compileTemplate('resetPasswordEmail', Assets.getText('emails/ResetPassword.html'));

/**
 * Verify Email
 */
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return 'Confirm Part-up account';
};
Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    return SSR.render('verifyAccountEmail', { user: user, url: url.replace('/#', '') });
};
SSR.compileTemplate('verifyAccountEmail', Assets.getText('emails/VerifyAccount.html'));
