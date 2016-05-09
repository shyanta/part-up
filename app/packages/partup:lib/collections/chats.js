/**
 * Chat model
 *
 * @memberOf Chats
 */
var Chat = function(document) {
    _.extend(this, document);
};

/**
 Chats are entities that group networks (also known as tribes)
 @namespace Chats
 */
Chats = new Mongo.Collection('chats', {
    transform: function(document) {
        return new Chat(document);
    }
});
