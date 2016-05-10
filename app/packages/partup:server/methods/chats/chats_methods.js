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
    }
});
