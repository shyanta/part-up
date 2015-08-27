var d = Debug('services:emails');

// Types so far:
// * dailydigest
// * upper_mentioned_in_partup
// * invite_upper_to_partup_activity
// * invite_upper_to_network

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

        // Compile template
        SSR.compileTemplate(options.type, [
            Assets.getText('private/emails/header.html'),
            Assets.getText('private/emails/' + options.type + '.' + options.locale + '.html'),
            Assets.getText('private/emails/footer.html')
        ].join(''));

        options.typeData.baseUrl = Meteor.absoluteUrl();

        emailSettings.from = options.fromAddress;
        emailSettings.to = options.toAddress;
        emailSettings.subject = options.subject;
        emailSettings.html = SSR.render(options.type, options.typeData);

        Email.send(emailSettings);
    }
};
