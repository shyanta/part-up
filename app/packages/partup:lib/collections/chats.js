/**
 * Chat model
 *
 * @memberOf Chats
 */
var Chat = function(document) {
    _.extend(this, document);
};

/**
 * Set a user as typing
 *
 * @memberOf Chats
 * @param {String} userId the user id of the user that started typing
 * @param {Date} typingDate the front-end date of when the user started typing
 */
Chat.prototype.startedTyping = function(userId, typingDate) {
    var typingObject = Chats.findOne({_id: this._id, 'started_typing.upper_id': userId});
    if (typingObject) {
        Chats.update({_id: this._id, 'started_typing.upper_id': userId}, {$set: {'started_typing.$.date': typingDate}});
    } else {
        Chats.update(this._id, {$push: {started_typing: {upper_id: userId, date: typingDate}}});
    }
};

/**
 * Unset a typing user
 *
 * @memberOf Chats
 * @param {String} userId the user id of the user that stopped typing
 */
Chat.prototype.stoppedTyping = function(userId) {
    Chats.update(this._id, {$pull: {started_typing: {upper_id: userId}}});
};

/**
 * Get the unread chat count
 *
 * @memberOf Chats
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Chat.prototype.getUnreadCountForUser = function(userId) {
    var user = Meteor.users.findOneOrFail(userId);
    return ChatMessages.find({chat_id: this._id, read_by: {$nin: [user._id]}}).count();
};

/**
 @namespace Chats
 */
Chats = new Mongo.Collection('chats', {
    transform: function(document) {
        return new Chat(document);
    }
});

/**
 * Find chats for a single user
 *
 * @memberOf Chats
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Chats.findForUser = function(userId, options) {
    options = options || {};
    var user = Meteor.users.findOneOrFail(userId);

    // Begin with the private chats
    var userChats = user.chats || [];

    // And now collect the tribe chats
    var networks = Networks.find({_id: {$in: user.networks || []}});
    networks.forEach(function(network) {
        if (network.chat_id) userChats.push(network.chat_id);
    });

    if (!options.sort) {
        options.sort = {updated_at: -1};
    }

    // Return the IDs ordered by most recent
    return Chats.find({_id: {$in: userChats}}, options);
};
