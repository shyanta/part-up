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
     * @param {object} options
     * @param {string} options.type
     * @param {object} options.typeData
     * @param {string} options.toAddress
     * @param {string} options.fromAddress
     * @param {string} options.subject
     * @param {string} options.locale
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

        // Compile template
        SSR.compileTemplate(options.type, Assets.getText('private/emails/' + options.type + '.' + options.locale + '.html'));

        emailSettings.from = options.fromAddress;
        emailSettings.to = options.toAddress;
        emailSettings.subject = options.subject;
        emailSettings.html = SSR.render(options.type, options.typeData);

        Email.send(emailSettings);
    }
};
