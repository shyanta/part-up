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

    var matches = message.match(/\[user:[^\]|]+(?:\|[^\]]+)?\]/g);
    if (!matches) return mentions;

    var match;
    for (var i = 0; i < matches.length; i++) {
        match = matches[i].match(/\[user:([^\]|]+)(?:\|([^\]]+))?\]/);
        mentions.push({
            _id: match[1],
            name: match[2]
        });
    }

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
    return message.replace(/\[user:([^\]|]+)(?:\|([^\]]+))?\]/g, function(m, id, name) {
        return '<a data-usercard="' + id + '" class="pu-mention-user">@' + name + '</a>';
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
    var find;
    var replace;
    for (var i = 0; i < mentions.length; i++) {
        find = '@' + mentions[i].name;
        replace = '[user:' + mentions[i]._id + '|' + mentions[i].name + ']';
        message = message.replace(find, replace);
    }

    return message;
};
