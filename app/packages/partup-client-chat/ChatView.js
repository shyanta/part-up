Template.ChatView.onCreated(function() {
    var template = this;
    var chatId = template.data.config.chatId;
    if (!chatId) throw 'No chatId was provided';

    template.overscroll = new ReactiveVar(false);
    template.underscroll = new ReactiveVar(false);
    template.chatEmpty = new ReactiveVar(false);
    template.oldestUnreadMessage = new ReactiveVar(undefined);
    template.activeContext = new ReactiveVar(false);

    template.initialized = false;
    template.windowFocus = true;

    if (template.data.config.reactiveBottomBarHeight) {
        template.data.config.reactiveBottomBarHeight.equalsFunc = function(a, b) {
            // when the chatbar height changes (due to typing), the view should scroll to bottom
            template.instantlyScrollToBottom();
        };
    }

    var handleNewMessagesViewedIfMessageDividerIsOnScreen = function() {
        Meteor.setTimeout(function() {
            if (!template.dividerLineIsVisible() || !template.windowFocus) return;
            template.hideNewMessagesDivider();
        }, 4000);
    };

    template.instantlyScrollToBottom = function() {
        template.scrollContainer[0].scrollTop = 0;
    };

    template.dividerLineIsVisible = function() {
        var dividerElement = $('[data-new-messages-divider]');
        if (!dividerElement[0]) return false; // maybe it's already hidden, I dunno

        var scrollElement = template.scrollContainer;
        var scrollDest = dividerElement[0].offsetTop - (scrollElement[0].clientHeight - (dividerElement[0].clientHeight * 1.5));
        return scrollElement.scrollTop() >= scrollDest;
    };

    template.hideTimeout;
    template.hideNewMessagesDivider = function() {
        if (template.hideTimeout) clearTimeout(template.hideTimeout);
        template.data.config.onNewMessagesViewed();

        var overscroll = template.overscroll.get();
        var underscroll = template.underscroll.get();
        if (overscroll || underscroll) return;

        // check if the divider line is visible for the user, then hide it
        if (!template.dividerLineIsVisible()) return;

        var dividerElement = $('[data-new-messages-divider]');
        dividerElement.addClass('hide');

        // remove the oldestUnreadMessage when the divider has faded out
        Meteor.setTimeout(function() {
            template.oldestUnreadMessage.set(undefined);
        }, 250);
    };
    template.delayedHideNewMessagesDivider = function(delay) {
        if (template.hideTimeout) clearTimeout(template.hideTimeout);
        template.hideTimeout = setTimeout(template.hideNewMessagesDivider, delay);
        template.data.config.onNewMessagesViewed();
    };

    // autofocus on chatbar input field
    template.onWindowFocus = function(event) {
        template.windowFocus = true;
        template.stickyNewMessagesDividerHandler({hideLine: true});
        if ($(template.data.config.messageInputSelector)[0]) $(template.data.config.messageInputSelector).focus();
    };
    template.onWindowBlur = function(event) {
        template.windowFocus = false;
    };
    $(window).on('focus', template.onWindowFocus);
    $(window).on('blur', template.onWindowBlur);

    template.rememberOldestUnreadMessage = function(oldestUnreadMessage) {
        if (!template.oldestUnreadMessage.get()) {
            template.oldestUnreadMessage.set(oldestUnreadMessage);
        }
    };

    template.newMessagesDividerHandler = function(messages) {
        var chat = Chats.findOne(chatId);
        if (!chat) return;

        var userId = Meteor.userId();
        var counter = lodash.find(chat.counter || [], {user_id: userId});

        // get the unread messages count
        var unreadMessagesCount = counter ? counter.unread_count : 0;

        // stop if the user is not focussed or if there are no unread messages
        if (template.windowFocus && unreadMessagesCount <= 0) return;

        // if user is focussed stop here
        if (template.windowFocus && template.initialized) return;

        // returns the oldest unread message with n offset
        // offset = 0 is oldest, offset = 1 is second oldest
        var returnOldestUnreadMessageWithOffset = function(n) {
            return messages[messages.length - ((unreadMessagesCount + 1) - n)];
        };

        var offset = 0;
        var oldestUnreadMessage = returnOldestUnreadMessageWithOffset(offset);

        // stop if there is no oldest unread message
        if (!oldestUnreadMessage) return;

        // make sure the oldest unread message is not the current user's message
        while (oldestUnreadMessage.creator_id === userId) {
            offset++;
            var newOldestMessage = returnOldestUnreadMessageWithOffset(offset);
            if (!newOldestMessage) {
                oldestUnreadMessage = undefined;
                break;
            }
            oldestUnreadMessage = newOldestMessage;
            if (offset == unreadMessagesCount) break;
        }

        // again, stop if there is no oldest unread message
        if (!oldestUnreadMessage) return;

        template.rememberOldestUnreadMessage(oldestUnreadMessage);
    };

    template.stickyNewMessagesDividerHandler = function(options) {
        if ($('[data-new-messages-divider]')[0]) {
            var overscroll = $('[data-new-messages-divider]').position().top < 0;
            var underscroll = $('[data-new-messages-divider]').position().top > (template.scrollContainer[0].clientHeight - $('[data-new-messages-divider]').outerHeight(true));
            template.overscroll.set(overscroll);
            template.underscroll.set(underscroll);
            if (!overscroll && (options && options.hideLine)) {
                template.delayedHideNewMessagesDivider(1000);
            }
        }
    };

    template.scrollToNewMessages = function() {
        template.overscroll.set(false);
        template.underscroll.set(false);

        var dividerElement = $('[data-new-messages-divider]');
        var scrollElement = template.scrollContainer;
        var scrollDest = dividerElement[0].offsetTop - (scrollElement.height());

        scrollElement.animate({
            scrollTop: scrollDest
        }, 300, function() {
            template.delayedHideNewMessagesDivider(1000);
        });
    };

    template.onMessageClick = function(event, message) {
        if (!template.data.config.onMessageClick) return;
        var searching = false;
        if (template.data.config.reactiveHighlight) {
            searching = !!template.data.config.reactiveHighlight.curValue;
        }
        template.data.config.onMessageClick({
            message: message,
            searching: searching,
            target: $('[data-chat-message-id=' + message._id + ']')
        });
    };

    var newMessageListeneners = [];
    template.onNewMessageRender = function(callback) {
        newMessageListeneners.push(callback);
    };
    template.newMessagesDidRender = function() {
        newMessageListeneners.forEach(function() {
            newMessageListeneners.pop().call();
        });
    };

    template.scrollHandler = function(customScrollEvent) {
        template.stickyNewMessagesDividerHandler({hideLine: true});
        if (template.data.config.onScrollTop) {
            var offset = template.data.config.onScrollTop.offset || 0;
            if (customScrollEvent.top.offset <= offset) template.data.config.onScrollTop.handler();
        }
    };

    var initialize = function() {
        template.autorun(function() {
            var messages = template.data.config.reactiveMessages.get();
            Tracker.nonreactive(function() {
                template.newMessagesDividerHandler(messages);
                template.chatEmpty.set(!messages.length);
            });
        });

        template.data.config.onNewMessagesViewed();
        handleNewMessagesViewedIfMessageDividerIsOnScreen();
    };

    template.initialize = function() {
        Partup.client.chat.initialize(template);
        initialize();
        template.initialized = true;
    };

});

Template.ChatView.onRendered(function() {
    var template = this;
    template.scrollContainer = $('[data-pu-reversed-scroller]');
    template.initialize();
});

Template.ChatView.onDestroyed(function() {
    var template = this;
    $(window).off('focus', template.onWindowFocus);
    $(window).off('blur', template.onWindowBlur);
    Partup.client.chat.destroy();
});

Template.ChatView.helpers({
    messagesData: function() {
        var template = Template.instance();
        var messages = template.data.config.reactiveMessages.get();
        var oldestUnreadMessage = template.oldestUnreadMessage.get();
        var dateBorder = oldestUnreadMessage ? oldestUnreadMessage.created_at : new Date();
        return {
            old: function() {
                return _.filter(messages, function(message) {
                    return message.created_at < dateBorder;
                });
            },
            new: function() {
                return _.filter(messages, function(message) {
                    return message.created_at >= dateBorder;
                });
            }
        };
    },
    groupByDelay: function(messages) {
        return Partup.client.chatmessages.groupByDelay(messages || [], {seconds: 180});
    },
    groupByDay: function(messages) {
        return Partup.client.chatmessages.groupByCreationDay(messages || []);
    },
    groupByUser: function(messages) {
        return Partup.client.chatmessages.groupByCreatorId(messages || []);
    },
    state: function() {
        var template = Template.instance();
        return {
            reactiveHighlight: function() {
                return template.data.config.reactiveHighlight;
            },
            limitReached: function() {
                return template.data.config.messageLimitReached;
            },
            overscroll: function() {
                return template.overscroll.get();
            },
            underscroll: function() {
                return template.underscroll.get();
            },
            chatEmpty: function() {
                return template.chatEmpty.get();
            },
            placeholderText: function() {
                return template.data.config.placeholderText;
            },
            bottomOffset: function() {
                return template.data.config.reactiveBottomBarHeight.get();
            },
            activeContext: function() {
                var message = template.activeContext.get();
                if (!message) return false;
                if (message.created_at) return message;
                return {
                    _id: message._id,
                    no_date: TAPi18n.__('pages-app-network-chat-highlight-context-no-date')
                };
            }
        };
    },
    handlers: function() {
        var template = Template.instance();
        return {
            onMessageRender: function() {
                return template.newMessagesDidRender;
            },
            onMessageClick: function() {
                return template.onMessageClick;
            },
            onScroll: function() {
                return template.scrollHandler;
            }
        };
    },
    translations: function() {
        var template = Template.instance();
        return {
            noresultsResults: function() {
                return TAPi18n.__('pages-app-chat-label-noresults', {
                    searchquery: template.data.config.reactiveHighlight.get()
                });
            },
            showingResults: function() {
                return TAPi18n.__('pages-app-chat-label-showingresults', {
                    searchquery: template.data.config.reactiveHighlight.get()
                });
            }
        };
    }
});

Template.ChatView.events({
    'click [data-new-messages-divider]': function(event, template) {
        template.hideNewMessagesDivider();
    },
    'click [data-scrollto]': function(event, template) {
        event.preventDefault();
        template.scrollToNewMessages();
    },
    'click [data-clear-context]': function(event, template) {
        Partup.client.chat.clearMessageContext();
    }
});

