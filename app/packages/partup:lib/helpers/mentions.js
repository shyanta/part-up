/**
 * @namespace Helpers
 * @name Partup.helpers.mentions
 * @memberof Partup.helpers
 */
Partup.helpers.mentions = {};

/**
 * Extract mentions from a message
 *
 * @namespace Helpers
 * @name Partup.helpers.mentions.extract
 * @memberof Partup.helpers.mentions
 *
 * @param {String} message
 *
 * @return {Array}
 */
Partup.helpers.mentions.extract = function(message) {
    var mentions = [];

    // extracts user (single) mentions
    extractUsers(message).forEach(function(mention) {
        mentions.push(mention);
    });

    // extracts partners (group) mention
    extractPartners(message).forEach(function(mention) {
        mentions.push(mention);
    });

    // extracts supporters (group) mention
    extractSupporters(message).forEach(function(mention) {
        mentions.push(mention);
    });

    return mentions;
};

var extractUsers = function(message) {
    var mentions = [];

    var matches = message.match(/\[user:[^\]|]+(?:\|[^\]]+)?\]/g);
    if (!matches) return mentions;

    var match;
    for (var i = 0; i < matches.length; i++) {
        match = matches[i].match(/\[user:([^\]|]+)(?:\|([^\]]+))?\]/);
        mentions.push({
            _id: match[1],
            type: 'single',
            name: match[2]
        });
    }

    return mentions;
};

var extractPartners = function(message) {
    var mentions = [];

    var matches = message.match(/\[Partners:(?:([^\]]+))?\]/g);
    if (!matches) return mentions;

    matches.forEach(function(match, index) {
        var singlematch = match.match(/\[Partners:(?:([^\]]+))?\]/);
        mentions.push({
            type: 'group',
            users: singlematch[1].split(','),
            name: 'Partners'
        });
    });

    return mentions;
};

var extractSupporters = function(message) {
    var mentions = [];

    var matches = message.match(/\[Supporters:(?:([^\]]+))?\]/g);
    if (!matches) return mentions;

    matches.forEach(function(match, index) {
        var singlematch = match.match(/\[Supporters:(?:([^\]]+))?\]/);
        mentions.push({
            type: 'group',
            users: singlematch[1].split(','),
            name: 'Supporters'
        });
    });

    return mentions;
};

/**
 * Replace mentions in a message with hyperlinks
 *
 * @namespace Helpers
 * @name Partup.helpers.mentions.decode
 * @memberof Partup.helpers.mentions
 *
 * @param {String} message
 *
 * @return {String}
 */
Partup.helpers.mentions.decode = function(message) {
    return message.replace(/\[Supporters:(?:([^\]]+))?\]/g, function(m, users) {
        // decode supporter mentions
        var name = 'Supporters';
        return '<a data-usercard="group" data-usercard-list="' + users + '" class="pu-mention-group">' + name + '</a>';
    }).replace(/\[Partners:(?:([^\]]+))?\]/g, function(m, users) {
        // decode upper mentions
        var name = 'Partners';
        return '<a data-usercard="group" data-usercard-list="' + users + '" class="pu-mention-group">' + name + '</a>';
    }).replace(/\[user:([^\]|]+)(?:\|([^\]]+))?\]/g, function(m, id, name) {
        // decode invividual mentions
        return '<a data-usercard="' + id + '" class="pu-mention-user">' + name + '</a>';
    });
};

/**
 * Encode user-selected mentions into the message
 *
 * @namespace Helpers
 * @name Partup.helpers.mentions.encode
 * @memberof Partup.helpers.mentions
 *
 * @param {String} message
 * @param {Array} mentions
 *
 * @return {String}
 */
Partup.helpers.mentions.encode = function(message, mentions) {
    mentions.forEach(function(mention, index) {
        // determine part of message to be encoded
        var find = '@' + mention.name;
        var encodedMention;
        // check if the mention is a group mention (partners/supporters) or single mention (user)
        if (mention.group) {
            var group = mention.name;
            // first part of encoded mention string -> [partners:
            encodedMention = '[' + group + ':';

            // second part of encoded mention string -> [partners:<user_id>,<user_id>,
            mention[group].forEach(function(user, index) {
                encodedMention = encodedMention + user + ',';
            });

            // removes the last comma -> [partners:<user_id>,<user_id>
            encodedMention = encodedMention.substring(0, encodedMention.length - 1);

            // final part of encoded mention -> [partners:<user_id>,<user_id>]
            encodedMention = encodedMention + ']';

        } else {
            // encodes single mention -> [user:<user_id>:<user_name>]
            encodedMention = '[user:' + mention._id + '|' + mention.name + ']';
        }
        // finally replace mention with encoded mention
        message = message.replace(find, encodedMention);
    });
    return message;
};
