var d = Debug('services:emails');

// Types so far:
// * dailydigest
// * upper_mentioned_in_partup
// * invite_upper_to_partup_activity
// * invite_upper_to_network
// * partup_created_in_network

var locales = ['en', 'nl'];
var templates = [
    'dailydigest',
    'invite_upper_to_network',
    'invite_upper_to_partup_activity',
    'upper_mentioned_in_partup'
];
var templateName;
var templateFile;

/**
 * Pre-compile all template combinations so it only happens once
 */
templates.forEach(function(type) {
    locales.forEach(function(locale) {
        SSR.compileTemplate('email-' + type + '-' + locale, [
            Assets.getText('private/emails/header.' + locale + '.html'),
            Assets.getText('private/emails/' + type + '.' + locale + '.html'),
            Assets.getText('private/emails/footer.' + locale + '.html')
        ].join(''));
    });
});

/**
 @namespace Partup server email service
 @name Partup.server.services.emails
 @memberof Partup.server.services
 */
Partup.server.services.emails = {
    /**
     * Send an email
     *
     * @param {Object} options
     * @param {String} options.type
     * @param {Object} options.typeData
     * @param {String} options.toAddress
     * @param {String} options.fromAddress
     * @param {String} options.subject
     * @param {String} options.locale
     * @param {Object} options.userEmailPreferences
     */
    send: function(options) {
        var options = options || {};
        var emailSettings = {};

        if (!options.type) throw new Meteor.Error('Required argument [options.type] is missing for method [Partup.server.services.emails::send]');
        if (!options.typeData) throw new Meteor.Error('Required argument [options.typeData] is missing for method [Partup.server.services.emails::send]');
        if (!options.toAddress) throw new Meteor.Error('Required argument [options.toAddress] is missing for method [Partup.server.services.emails::send]');
        if (!options.fromAddress) options.fromAddress = Partup.constants.EMAIL_FROM;
        if (!options.subject) throw new Meteor.Error('Required argument [options.subject] is missing for method [Partup.server.services.emails::send]');
        if (!options.locale) throw new Meteor.Error('Required argument [options.locale] is missing for method [Partup.server.services.emails::send]');

        // Check if user has disabled this email type
        if (options.userEmailPreferences && !options.userEmailPreferences[options.type]) {
            // This mail is disabled, so end here
            return;
        }

        options.typeData.baseUrl = Meteor.absoluteUrl();

        emailSettings.from = options.fromAddress;
        emailSettings.to = options.toAddress;
        emailSettings.subject = options.subject;
        emailSettings.html = SSR.render('email-' + options.type + '-' + options.locale, options.typeData);

        Email.send(emailSettings);
    }
};
