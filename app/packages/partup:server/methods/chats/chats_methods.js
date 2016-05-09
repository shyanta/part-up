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
                private: fields.private,
                started_typing: new Date(),
                updated_at: new Date()
            };

            if (fields.network_id) chat.network_id = fields.network_id;

            return Chats.insert(chat);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chat_could_not_be_inserted');
        }
    }
});
