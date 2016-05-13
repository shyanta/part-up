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
    Chats.update(this._id, {$addToSet: {started_typing: userId}});
};

/**
 * Unset a typing user
 *
 * @memberOf Chats
 * @param {String} userId the user id of the user that stopped typing
 */
Chat.prototype.stoppedTyping = function(userId) {
    Chats.update(this._id, {$pull: {started_typing: userId}});
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
Chats.findForUser = function(userId) {
    var user = Meteor.users.findOneOrFail(userId);
    var userChats = user.chats || [];
    var chatIds = [];
    userChats.forEach(function(chatObject) {
        chatIds.push(chatObject.chat_id);
    });

    return Chats.find({_id: {$in: chatIds}});
};
