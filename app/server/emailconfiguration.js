Accounts.emailTemplates.from = 'Part-up <noreply@part-up.com>';
Accounts.emailTemplates.resetPassword.subject = function(user) {
    return 'Reset Part-up password';
}
Accounts.emailTemplates.resetPassword.text = function(user, url) {
    return [
        'Hello ' + user.profile.name + '\n',
        '\n',
        'To reset your password, click the link below\n',
        '\n',
        url.replace('/#', '') + '\n',
        '\n',
        'Regards,\n',
        'Part-up'
    ].join();
}