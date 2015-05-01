Accounts.emailTemplates.from = 'Part-up <noreply@part-up.com>';

Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'Reset Part-up password';
}

Accounts.emailTemplates.resetPassword.text = function(user, url) {
    return SSR.render('emailText', { user: user, url: url.replace('/#', '') });
}

SSR.compileTemplate('emailText', Assets.getText('emails/ResetPassword.html'));

// Template.emailText.helpers({
//     time: function() {
//         return new Date().toString();
//     }
// });
