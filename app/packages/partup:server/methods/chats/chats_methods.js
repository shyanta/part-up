Meteor.methods({
    /**
     * Insert a chat
     *
     * @param {mixed[]} fields
     */
    'chats.insert': function(fields) {
        check(fields, Partup.schemas.forms.chat);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var chat = {
                _id: Random.id(),
                created_at: new Date(),
                creator_id: user._id,
                started_typing: {},
                updated_at: new Date()
            };

            Chats.insert(chat);

            return chat._id;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chat_could_not_be_inserted');
        }
    },

    /**
     * Set current user as started typing
     *
     * @param {String} chatId
     * @param {Date} typingDate
     */
    'chats.started_typing': function(chatId, typingDate) {
        check(String, chatId);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var chat = Chats.findOneOrFail(chatId);
            chat.startedTyping(user._id, typingDate);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chats_started_typing_could_not_be_updated');
        }
    },

    /**
     * Set current user as started typing
     *
     * @param {String} chatId
     */
    'chats.stopped_typing': function(chatId) {
        check(String, chatId);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var chat = Chats.findOneOrFail(chatId);
            chat.stoppedTyping(user._id);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chats_started_typing_could_not_be_updated');
        }
    }
});
