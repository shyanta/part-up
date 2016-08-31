Meteor.publishComposite('chats.for_loggedin_user', function(parameters, options) {
    this.unblock();

    // FIXME: hack is necessary for backwards compatibility. please remove after app 1.2.3 publication
    if (!options) {
        options = parameters;
        parameters = {private: true};
    }

    parameters = parameters || {};
    options = options || {};
    check(parameters, {
        private: Match.Optional(Boolean),
        networks: Match.Optional(Boolean)
    });
    check(options, {
        limit: Match.Optional(Number),
        skip: Match.Optional(Number)
    });

    var latestChatMessageOptions = {
        sort: {
            created_at: -1
        },
        limit: 1,
        fields: {
            _id: 1,
            chat_id: 1,
            content: 1,
            created_at: 1,
            creator_id: 1
        }
    };

    return {
        find: function() {
            return Meteor.users.findSinglePrivateProfile(this.userId);
        },
        children: [

            /**
             * All network chats + children
             */

            {
                find: function(user) {
                    if (!parameters.networks) return;
                    return Networks.find({
                        _id: {
                            $in: user.networks || []
                        },
                        archived_at: {
                            $exists: false
                        }
                    }, {fields: {name: 1, slug: 1, chat_id: 1, image: 1, admins: 1, uppers: 1}});
                },
                children: [{
                    find: Images.findForNetwork
                },{
                    // Network chats
                    find: function(network) {
                        var chatOptions = options;
                        chatOptions.fields = {_id: 1, updated_at: 1, created_at: 1};
                        return Chats.find(network.chat_id, chatOptions);
                    },
                    children: [{
                        // Latest chatmessage
                        find: function(chat) {
                            return ChatMessages.find({chat_id: chat._id}, latestChatMessageOptions);
                        },
                        children: [
                            {
                                // Chatmessage User
                                find: function(chatMessage, chat) {
                                    return Meteor.users.findSinglePublicProfile(chatMessage.creator_id);
                                },
                                children: [{
                                    find: Images.findForUser
                                }]
                            }
                        ]
                    }]
                }]
            },

            /**
             * All private chats + children
             */
            {
                find: function(user) {
                    if (!parameters.private) return;
                    var chatOptions = options;
                    chatOptions.fields = {_id: 1, updated_at: 1, created_at: 1};
                    return Chats.findForUser(user._id, {private: true}, chatOptions);
                },
                children: [{
                    find: function(chat) {
                        return Meteor.users.findMultiplePublicProfiles([], {}, {hackyReplaceSelectorWithChatId: chat._id});
                    },
                    children: [{
                        find: Images.findForUser
                    }]
                },{
                    // Latest chatmessage
                    find: function(chat) {
                        return ChatMessages.find({chat_id: chat._id}, latestChatMessageOptions);
                    }
                    // no User publication for ChatMessage is required, since this publication already publishes all the chat users
                }]
            }
        ]
    };
});

Meteor.publishComposite('chats.for_loggedin_user.for_count', function(parameters, options) {
    this.unblock();

    parameters = parameters || {};
    check(parameters, {
        private: Match.Optional(Boolean),
        networks: Match.Optional(Boolean)
    });

    return {
        find: function() {
            return Meteor.users.findSinglePrivateProfile(this.userId);
        },
        children: [{
            find: function(user) {
                return Chats.findForUser(user._id, parameters, options);
            },
            children: [{
                find: function(chat, user) {
                    return Networks.find({chat_id: chat._id}, {fields: {chat_id: 1, uppers: 1}, limit: 1});
                }
            }]
        }]
    };
});

Meteor.publishComposite('chats.by_id', function(chatId, chatMessagesOptions) {
    this.unblock();
    check(chatId, String);
    chatMessagesOptions = chatMessagesOptions || {};
    check(chatMessagesOptions, {
        limit: Match.Optional(Number),
        skip: Match.Optional(Number)
    });

    chatMessagesOptions.fields = {
        _id: 1,
        chat_id: 1,
        content: 1,
        created_at: 1,
        creator_id: 1
    };

    return {
        find: function() {
            return Meteor.users.findSinglePrivateProfile(this.userId);
        },
        children: [
            {
                find: function(user) {
                    if (user.chats && user.chats.indexOf(chatId) === -1) return;
                    return Chats.findOneForUser(this.userId, chatId, {});
                },
                children: [
                    {
                        find: function(chat) {
                            return Meteor.users.findMultiplePublicProfiles([], {}, {hackyReplaceSelectorWithChatId: chat._id});
                        },
                        children: [
                            {find: Images.findForUser}
                        ]
                    },
                    {
                        find: function(chat) {
                            if (!chatMessagesOptions.sort) chatMessagesOptions.sort = {created_at: -1};
                            return ChatMessages.find({chat_id: chat._id}, chatMessagesOptions);
                        }
                        // no User publication for ChatMessage is required, since this publication already publishes all the chat users
                    }
                ]
            }
        ]
    };
});
