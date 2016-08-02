Template.DropdownChatNotifications.onCreated(function() {
    var template = this;
    template.private = new ReactiveVar(true);
    template.dropdownOpen = new ReactiveVar(false);
    template.setDropdownState = function(state, notificationId) {
        var query = {
            seen_by: {$nin: [Meteor.userId()]}
        };
        if (template.private.get()) {
            query.chat_id = notificationId;
        } else {

        }
        var messages = ChatMessages.find(query).forEach(function(message) {
            Meteor.call('chatmessages.seen', message._id);
        });
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
    'click [data-notification]': function(event, template) {
        var notificationId = $(event.currentTarget).data('notification');
        template.setDropdownState(false);
    },
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
        var chats = Chats.findForUser(userId, {networks: !getPrivate, private: getPrivate}, {fields: {_id: 1, counter: 1, created_at: 1}, sort: {updated_at: -1}})
            .map(function(chat) {
                if (getPrivate) {
                    chat.upper = Meteor.users
                        .findOne({_id: {$nin: [userId]}, chats: {$in: [chat._id]}});
                }

                chat.message = ChatMessages.findOne({chat_id: chat._id}, {sort: {created_at: -1}, limit: 1});
                chat.hasMessages = !!chat.message;
                chat.messagesHaveBeenSeen = !chat.message || chat.message.isSeenByUpper(userId);
                chat.messagesHaveBeenRead = !chat.message || !chat.hasUnreadMessages();

                return chat;
            });

        return {
            chats: function() {
                return chats;
            },
            totalTribeMessages: function() {
                return Chats
                    .findForUser(userId, {networks: true})
                    .map(function(chat) {
                        var counter = lodash.find(chat.counter, {user_id: userId});
                        return counter ? counter.unread_count : 0;
                    }).reduce(function(prev, curr) {
                        return prev + curr;
                    }, 0);
            },
            totalPersonalMessages: function() {
                return Chats
                    .findForUser(userId, {private: true})
                    .map(function(chat) {
                        var counter = lodash.find(chat.counter, {user_id: userId});
                        return counter ? counter.unread_count : 0;
                    }).reduce(function(prev, curr) {
                        return prev + curr;
                    }, 0);
            }
        };
    }
});
