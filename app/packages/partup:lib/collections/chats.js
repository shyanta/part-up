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
    return Chats.find({_id: {$in: userChats}});
};
