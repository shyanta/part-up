/**
 * ChatMessage model
 *
 * @memberOf ChatMessages
 */
var ChatMessage = function(document) {
    _.extend(this, document);
};

/**
 * Add upper to seen message list
 *
 * @memberOf ChatMessages
 * @param {String} upperId
 * @return {Boolean}
 */
ChatMessage.prototype.addToSeen = function(upperId) {
    ChatMessages.update(this._id, {$addToSet: {seen_by: upperId}});
};

/**
 * Add upper to read message list
 *
 * @memberOf ChatMessages
 * @param {String} upperId
 * @return {Boolean}
 */
ChatMessage.prototype.addToRead = function(upperId) {
    ChatMessages.update(this._id, {$addToSet: {read_by: upperId}});
};

/**
 @namespace ChatMessages
 */
ChatMessages = new Mongo.Collection('chatmessages', {
    transform: function(document) {
        return new ChatMessage(document);
    }
});
