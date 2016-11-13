Template.DropdownChatNotifications.onCreated(function() {
    var template = this;
    template.private = new ReactiveVar(true);
    template.dropdownOpen = new ReactiveVar(false);
    template.setDropdownState = function(state) {
        template.dropdownOpen.set(state);
    };
    template.subscribe('chats.for_loggedin_user', {networks: true, private: true}, {});
});
Template.DropdownChatNotifications.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu=chat-notifications]');
    Router.onBeforeAction(function(req, res, next) {
        template.dropdownOpen.set(false);
        next();
    });
});

Template.DropdownChatNotifications.onDestroyed(function() {
    var template = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(template);
});

Template.DropdownChatNotifications.events({
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'click [data-private]': function(event, template) {
        event.preventDefault();
        template.private.set(true);
    },
    'click [data-network]': function(event, template) {
        event.preventDefault();
        template.private.set(false);
    }
});

Template.DropdownChatNotifications.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    reactiveDropdownOpen: function() {
        return Template.instance().dropdownOpen;
    },
    private: function() {
        return Template.instance().private.get();
    },
    data: function() {
        var template = Template.instance();
        var userId = Meteor.userId();
        if (!userId) return;
        var getPrivate = template.private.get();
        var currentActiveChatId = Session.get('partup-current-active-chat');

        var networkChats = Chats.findForUser(userId, {networks: true}, {fields: {_id: 1, counter: 1, created_at: 1}, sort: {updated_at: -1}})
            .map(function(chat) {
                chat.message = ChatMessages.findOne({chat_id: chat._id}, {sort: {created_at: -1}, limit: 1});

                if (chat.message) chat.message.creator = Meteor.users.findOne({_id: chat.message.creator_id});

                return chat;
            });

        var privateChats = Chats.findForUser(userId, {private: true}, {fields: {_id: 1, counter: 1, created_at: 1}, sort: {updated_at: -1}})
            .map(function(chat) {
                chat.creator = Meteor.users
                    .findOne({_id: {$nin: [userId]}, chats: {$in: [chat._id]}});

                chat.message = ChatMessages.findOne({chat_id: chat._id}, {sort: {created_at: -1}, limit: 1});

                return chat;
            });

        return {
            chats: function() {
                if (getPrivate) return privateChats;
                return networkChats;
            },
            totalTribeMessages: function() {
                return networkChats
                    .map(function(chat) {
                        if (chat._id === currentActiveChatId) return 0;
                        return chat.unreadCount();
                    }).reduce(function(prev, curr) {
                        return prev + curr;
                    }, 0);
            },
            totalPersonalMessages: function() {
                return privateChats
                    .map(function(chat) {
                        if (chat._id === currentActiveChatId) return 0;
                        return chat.unreadCount();
                    }).reduce(function(prev, curr) {
                        return prev + curr;
                    }, 0);
            }
        };
    },
    notificationClickHandler: function() {
        var template = Template.instance();
        return function() {
            template.setDropdownState(false);
        };
    }
});
