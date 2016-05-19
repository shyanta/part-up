Meteor.methods({
    /**
     * Insert a chat message in the chat
     *
     * @param {mixed[]} fields
     */
    'chatmessages.insert': function(fields) {
        check(fields, Partup.schemas.forms.chatMessage);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var chatMessage = {
                _id: Random.id(),
                chat_id: fields.chat_id,
                content: fields.content,
                created_at: new Date(),
                creator_id: user._id,
                read_by: [],
                seen_by: [],
                updated_at: new Date()
            };

            ChatMessages.insert(chatMessage);

            return chatMessage._id;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chatmessage_could_not_be_inserted');
        }
    },

    /**
     * Remove a chat message from the chat
     *
     * @param {String} chatMessageId
     */
    'chatmessages.remove': function(chatMessageId) {
        check(chatMessageId, String);

        var user = Meteor.user();
        var chatMessage = ChatMessages.findOneOrFail(chatMessageId);
        if (!user || chatMessage.creator_id !== user._id) throw new Meteor.Error(401, 'unauthorized');

        try {
            ChatMessages.remove(chatMessage._id);
        } catch (error) {
            throw new Meteor.Error(400, 'chatmessage_could_not_be_deleted');
        }
    },

    /**
     * Add upper to seen list
     *
     * @param {String} chatMessageId
     */
    'chatmessages.seen': function(chatMessageId) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var chatMessage = ChatMessages.findOne(chatMessageId);
            chatMessage.addToSeen(user._id);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chatmessage_could_not_be_inserted');
        }
    },

    /**
     * Add upper to read list (and automatically to seen)
     *
     * @param {String} chatMessageId
     */
    'chatmessages.read': function(chatMessageId) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var chatMessage = ChatMessages.findOne(chatMessageId);
            chatMessage.addToSeen(user._id);
            chatMessage.addToRead(user._id);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chatmessage_could_not_be_inserted');
        }
    }
});
