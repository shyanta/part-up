Template.DropdownChatNotifications.onCreated(function () {
    var template = this;
    template.isPrivateChat = new ReactiveVar(true);
    template.newMessage = new ReactiveVar(undefined);
    template.latestMessage = new ReactiveVar(0);

    /** variable name gets used by the ClientDropdowns event handler. */
    template.dropdownOpen = new ReactiveVar(false);

    template.subscribe('chats.for_loggedin_user', { networks: true, private: true }, {});
});
Template.DropdownChatNotifications.onRendered(function () {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu=chat-notifications]', function () { ClientDropdowns.partupNavigationSubmenuActive.set(false); });
    Router.onBeforeAction(function (req, res, next) {
        template.dropdownOpen.set(false);
        next();
    });
});

Template.DropdownChatNotifications.onDestroyed(function () {
    var template = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(template);
});

Template.DropdownChatNotifications.events({
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'click [data-toggle-menu]': function (event, template) {
        template.newMessage.set(false);
        ClientDropdowns.dropdownClickHandler(event, template);
        //ClientDropdowns.dropdownClickHandler.bind(null, 'top-level') <-- old implementation.
    },
    'click [data-private]': function (event, template) {
        event.preventDefault();
        template.isPrivateChat.set(true);
    },
    'click [data-network]': function (event, template) {
        event.preventDefault();
        template.isPrivateChat.set(false);
    }
});

Template.DropdownChatNotifications.helpers({
    dropdownOpen: function () {
        return Template.instance().dropdownOpen.get();
    },
    isPrivateChat: function () {
        return Template.instance().isPrivateChat.get();
    },
    chatData: function () {
        var template = Template.instance();
        var userId = Meteor.userId();

        if (!userId) return;
        var currentActiveChatId = Session.get('partup-current-active-chat');

        var privateChats =
            Chats.findForUser(userId, { private: true }, { fields: { _id: 1, counter: 1, created_at: 1 }, sort: { updated_at: -1 } })
                .map(function (chat) {
                    chat.creator =
                        Meteor.users.findOne({ _id: { $nin: [userId] }, chats: { $in: [chat._id] } });
                    chat.message =
                        ChatMessages.findOne({ chat_id: chat._id }, { sort: { created_at: -1 }, limit: 1 });
                    return chat;
                });
        var networkChats =
            Chats.findForUser(userId, { networks: true }, { fields: { _id: 1, counter: 1, created_at: 1 }, sort: { updated_at: -1 } })
                .map(function (chat) {
                    chat.message =
                        ChatMessages.findOne({ chat_id: chat._id }, { sort: { created_at: -1 }, limit: 1 });
                    if (chat.message) {
                        chat.message.creator =
                            Meteor.users.findOne({ _id: chat.message.creator_id });
                    }
                    return chat;
                });

        var totalChatMessages = function (chatCollection) {
            return chatCollection
                .map((chat) => {
                    return chat._id === currentActiveChatId ? 0 : chat.unreadCount();
                }).reduce((prev, curr) => {
                    return prev + curr;
                }, 0);
        };
        var chatMessageTime = (chat) => {
            return chat.message ? Date.parse(chat.message.created_at) : 0;
        };
        var latestChat = () => {
            var getLatest = (chatCollection) => {
                return _.max(
                    _.filter(chatCollection, (chat) => {
                        return (chat.message && chat.message.creator_id !== userId);
                    }), (chat) => chatMessageTime(chat));
            };
            var private = getLatest(privateChats);
            var network = getLatest(networkChats);

            return chatMessageTime(private) > chatMessageTime(network) ? private : network;
        };
        var hasNewMessage = (chat, messageTime, unreadMessageCount) => {
                if (template.newMessage.get() === undefined) {
                    if (unreadMessageCount) {
                        template.newMessage.set(true);
                    }
                    template.latestMessage.set(messageTime);
                } else {
                    if (chat && chat._id === currentActiveChatId) {
                        template.newMessage.set(false);
                        template.latestMessage.set(messageTime);
                    } else {
                        if (messageTime > template.latestMessage.get()) {
                            template.newMessage.set(true);
                            template.latestMessage.set(messageTime);
                        }
                    }
                }
                return template.newMessage.get();
        };

        return {
            chats: template.isPrivateChat.get() ? privateChats : networkChats,
            totalPrivateMessages: totalChatMessages(privateChats),
            totalNetworkMessages: totalChatMessages(networkChats),
            hasNewMessages: function () {
                var chat = latestChat();
                var messageTime = chatMessageTime(chat);
                var unreadMessageCount = this.totalPrivateMessages || this.totalNetworkMessages;
                return hasNewMessage(chat, messageTime, unreadMessageCount);
            }
        }
    },
    notificationClickHandler: function () {
        var template = Template.instance();
        return function () {
            template.dropdownOpen.set(false);
        };
    },
    appStoreLink: function () {
        return Partup.client.browser.getAppStoreLink();
    }
});
