Template.NetworkChat.onCreated(function() {
    var template = this;
    var networkSlug = template.data.networkSlug;
    var chatId = undefined;

    template.oldestNewMessage = new ReactiveVar(undefined);
    template.overscroll = new ReactiveVar(false);
    template.underscroll = new ReactiveVar(false);

    template.subscribe('networks.one.chat', networkSlug, {
        onReady: function() {
            var chat = Chats.findOne();
            if (chat) {
                chatId = chat._id;
                return;
            }

            Meteor.call('networks.chat_insert', networkSlug, {}, function(err, chat_id) {
                if (err) return Partup.client.notify.error('Error initializing tribe chat');
                chatId = chat_id;
                Partup.client.notify.success('Tribe chat initialized');
            });
        }
    });

    // search
    template.searchQuery = new ReactiveVar('', function(a, b) {
        if (a !== b) {
            // do something
        }
    });
    var setSearchQuery = function(query) {
        template.searchQuery.set(query);
    };
    template.throttledSetSearchQuery = _.throttle(setSearchQuery, 500, {trailing: true});

    // typing
    var isTyping = false;
    template.resetTypingState = function() {
        template.resetMessageInput();
        Meteor.call('chats.stopped_typing', chatId, function() {
            isTyping = false;
        });
    };

    template.resetMessageInput = function() {
        $('[data-messageinput]')[0].value = '';
    };

    var resetTypingStateTimeout;
    template.enableTypingState = function() {
        if (!isTyping) {
            Meteor.call('chats.started_typing', chatId, new Date());
            isTyping = true;
        }
        if (resetTypingStateTimeout) clearTimeout(resetTypingStateTimeout);
        resetTypingStateTimeout = setTimeout(template.resetTypingState, 2000);
    };

    template.sendMessage = function(message) {
        if (!message) return false;
        var scroller = template.scrollContainer;

        var currentPosition = scroller.scrollTop;
        var bottomPosition = scroller[0].scrollHeight - scroller[0].clientHeight;

        Meteor.call('chatmessages.insert', {
            chat_id: chatId,
            content: message
        }, function(err, res) {
            if (err) return Partup.client.notify.error('Error sending message');

            template.resetTypingState();

            if (currentPosition === bottomPosition) {
                scroller[0].scrollTop = scroller[0].scrollHeight;
            } else {
                scroller.animate({
                    scrollTop: scroller[0].scrollHeight
                }, 500);
            }
        });
    };

    template.rememberOldestNewMessage = function(oldestNewMessage) {
        if (!template.focussed && oldestNewMessage) {
            if (!template.oldestNewMessage.get()) template.oldestNewMessage.set(oldestNewMessage);
        } else if (template.focussed) {
        }
        template.ajustScrollOffset();
    };

    template.ajustScrollOffset = function() {
        if (!template.scrollContainer) return;
        var element = template.scrollContainer[0];
        if (!element) return;
        var pos = element.scrollTop;
        var height = element.scrollHeight - element.clientHeight;
        _.defer(function() {
            if (pos === height) {
                element.scrollTop = element.scrollHeight;
            }
            template.stickyNewMessagesDividerHandler();
        });
    };

    template.scrollToNewMessages = function() {
        template.overscroll.set(false);
        template.underscroll.set(false);

        var dividerElement = $('[data-new-messages-divider]');
        var scrollElement = template.scrollContainer;
        var scrollDest = dividerElement[0].offsetTop - (dividerElement.outerHeight(true));

        scrollElement.animate({
            scrollTop: scrollDest
        }, 300, function() {
            template.delayedHideLine(1000);
        });
    };

    template.focussed = true;
    template.focusHandler = function(event) {
        template.focussed = true;
        template.stickyNewMessagesDividerHandler(true);
    };
    template.blurHandler = function(event) {
        template.focussed = false;
    };
    $(window).on('focus', template.focusHandler);
    $(window).on('blur', template.blurHandler);

    template.hideTimeout;
    template.hideLine = function() {
        if (template.hideTimeout) clearTimeout(template.hideTimeout);

        var overscroll = template.overscroll.get();
        var underscroll = template.underscroll.get();
        if (overscroll || underscroll) return;

        var dividerElement = $('[data-new-messages-divider]');
        if (!dividerElement[0]) return; // maybe it's already hidden, I dunno

        // check if the divider line is visible for the user, then hide it
        var scrollElement = template.scrollContainer;
        var scrollDest = dividerElement[0].offsetTop - (scrollElement[0].clientHeight - (dividerElement[0].clientHeight * 1.5));
        if (scrollElement.scrollTop() >= scrollDest) {
            dividerElement.addClass('hide');

            // remove the oldestNewMessage when the divider has faded out
            Meteor.setTimeout(function() {
                template.oldestNewMessage.set(undefined);
            }, 250);
        }
    };
    template.delayedHideLine = function(delay) {
        if (template.hideTimeout) clearTimeout(template.hideTimeout);
        template.hideTimeout = setTimeout(template.hideLine, delay);
    };

    template.stickyNewMessagesDividerHandler = function(hideWhenViewed) {
        if ($('[data-new-messages-divider]')[0]) {
            var overscroll = $('[data-new-messages-divider]').position().top < 0;
            var underscroll = $('[data-new-messages-divider]').position().top > (template.scrollContainer[0].clientHeight - $('[data-new-messages-divider]').outerHeight(true));
            template.overscroll.set(overscroll);
            template.underscroll.set(underscroll);
            if (!overscroll && hideWhenViewed) {
                template.delayedHideLine(1000);
            }
        }
    };

    // message storage
    var localCollection = [];
    template.messages = new ReactiveVar([]);
    template.autorun(function() {
        var messages = ChatMessages.find({}, {limit: 100, sort: {created_at: 1}}).fetch();
        localCollection = localCollection.concat(messages);
        localCollection = mout.array.unique(localCollection, function(message1, message2) {
            return message1._id === message2._id;
        });
        var lastMessage = localCollection[localCollection.length - 1];
        if (lastMessage) template.rememberOldestNewMessage(lastMessage);
        template.messages.set(localCollection);
    });
});

Template.NetworkChat.onRendered(function() {
    var template = this;
    template.scrollContainer = $('[data-reversed-scroller]');
    Meteor.setTimeout(function() {
        template.scrollContainer[0].scrollTop = template.scrollContainer[0].scrollHeight;
        $('[data-reversed-scroller-wrapper]').addClass('pu-state-active');
    }, 100);
});

Template.NetworkChat.onDestroyed(function() {
    var template = this;
    $(window).off('focus', template.focusHandler);
    $(window).off('blur', template.blurHandler);
    Meteor.clearInterval(template.chatTimer);
    Partup.client.chat.destroy();
});

Template.NetworkChat.helpers({
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        return {
            activeUppers: function() {
                return Meteor.users.find({'status.online': true, _id: {$not: Meteor.userId(), $in: network.uppers || []}});
            },
            messagesGroupedByDay: function(messages) {
                return Partup.client.chatmessages.groupByCreationDay(messages);
            },
            messagesGroupedByUser: function(messages) {
                return Partup.client.chatmessages.groupByCreatorId(messages);
            },
            messages: function() {
                var messages = template.messages.get();
                var oldestNewMessage = template.oldestNewMessage.get();
                var dateBorder = oldestNewMessage ? oldestNewMessage.created_at : new Date();
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
            chat: function() {
                return Chats.findOne();
            }
        };
    },
    state: function() {
        var template = Template.instance();
        return {
            overscroll: function() {
                return template.overscroll.get();
            },
            underscroll: function() {
                return template.underscroll.get();
            }
        };
    }
});
Template.NetworkChat.events({
    'keydown [data-submit=return]': function(event, template) {
        template.enableTypingState();
        // determine keycode (with cross browser compatibility)
        var pressedKey = event.which ? event.which : event.keyCode;

        // check if it's the 'return' key and if shift is NOT held down
        if (pressedKey == 13 && !event.shiftKey) {
            event.preventDefault();
            template.sendMessage($('[data-messageinput]').val());
        }
    },
    'click [data-send]': function(event, template) {
        event.preventDefault();
        template.sendMessage($('[data-messageinput]').val());
    },
    'click [data-scrollto]': function(event, template) {
        event.preventDefault();
        template.scrollToNewMessages();
    },
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'DOMMouseScroll [data-reversed-scroller], mousewheel [data-reversed-scroller]': function(event, template) {
        template.stickyNewMessagesDividerHandler(true);
    },
    // 'click [data-flexible-center]': function(event, template) {
    //     event.preventDefault();
    //     $(event.currentTarget).parent().addClass('start');
    //     _.defer(function() {
    //         $(event.currentTarget).parent().addClass('active');
    //         $('[data-search]').focus();
    //     });
    // },
    // 'click [data-clear]': function(event, template) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     $('[data-search]').val('');
    //     _.defer(function() {
    //         template.throttledSetSearchQuery('');
    //         $('[data-search]').blur();
    //     });
    // },
    // 'input [data-search]': function(event, template) {
    //     template.throttledSetSearchQuery(event.currentTarget.value);
    // },
    // 'focus [data-search]': function(event, template) {
    //     $(event.currentTarget).parent().addClass('start');
    //     _.defer(function() {
    //         template.focussed = true;
    //         $(event.currentTarget).parent().addClass('active');
    //     });
    // },
    // 'blur [data-search]': function(event, template) {
    //     if (!$(event.target).val()) {
    //         template.focussed = false;
    //         $('[data-flexible-center]').parent().removeClass('active');
    //     }
    // },
    // 'transitionend [data-flexible-center]': function(event, template) {
    //     $(event.currentTarget).parent().removeClass('start');
    // }
});
