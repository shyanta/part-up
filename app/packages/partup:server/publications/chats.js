Meteor.publishComposite('chats.for_loggedin_user', function(options) {
    this.unblock();

    options = options || {};
    check(options, {
        limit: Match.Optional(Number),
        skip: Match.Optional(Number)
    });

    return {
        find: function() {
            return Chats.findForUser(this.userId);
        },
        children: [
            {find: function(chat) {
                return ChatMessages.find({chat_id: chat._id});
            }}
        ]
    };
});
