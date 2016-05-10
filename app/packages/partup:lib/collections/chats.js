/**
 * Chat model
 *
 * @memberOf Chats
 */
var Chat = function(document) {
    _.extend(this, document);
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
