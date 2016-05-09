Meteor.methods({
    /**
     * Insert a chat message in the chat
     *
     * @param {mixed[]} fields
     */
    'chatmessages.insert': function(fields) {
        check(fields, String);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var chatMessage = {
                
            };
            return ChatMessages.insert(chatMessage);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'chatmessage_could_not_be_inserted');
        }
    }
});
