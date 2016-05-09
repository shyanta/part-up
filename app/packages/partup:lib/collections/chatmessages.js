/**
 * ChatMessage model
 *
 * @memberOf ChatMessages
 */
var ChatMessage = function(document) {
    _.extend(this, document);
};

/**
 @namespace ChatMessages
 */
ChatMessages = new Mongo.Collection('chatmessages', {
    transform: function(document) {
        return new ChatMessage(document);
    }
});
