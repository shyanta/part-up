Template.NetworkChat.onCreated(function() {
    var template = this;
    var networkSlug = template.data.networkSlug;
    template.chatId = undefined;
    template.subscribe('networks.one.chat', networkSlug, {
        onReady: function() {
            var chat = Chats.findOne();
            if (chat) {
                template.chatId = chat._id;
            } else {
                Meteor.call('networks.chat_insert', networkSlug, {}, function(err, res) {
                    if (err) return Partup.client.notify.error('Error initializing tribe chat');
                    template.chatId = res;
                    Partup.client.notify.success('Tribe chat initialized');
                });
            }
        }
    });
    template.searchQuery = new ReactiveVar('', function(a, b) {
        if (a !== b) {
            // do something
        }
    });
    var setSearchQuery = function(query) {
        template.searchQuery.set(query);
    };
    template.throttledSetSearchQuery = _.throttle(setSearchQuery, 500, {trailing: true});

    template.sendMessage = function() {
        var value = $('[data-messageinput]').val();
        if (!value) return false;
        var scroller = $('[data-reversed-scroller]')[0];
        var pos = scroller.scrollTop;
        var height = scroller.scrollHeight - scroller.clientHeight;
        Meteor.call('chatmessages.insert', {
            chat_id: template.chatId,
            content: value
        }, function(err, res) {
            if (err) return Partup.client.notify.error('Error sending message');
            $('[data-messageinput]')[0].value = '';
            if (pos === height) {
                template.stopTyping();
                scroller.scrollTop = scroller.scrollHeight;
            }
        });
    };
    var typingStarted = false;
    template.stopTyping = function() {
        Meteor.call('chats.stopped_typing', template.chatId, function() {
            typingStarted = false;
        });
    };
    var stopTimeout;
    template.startedTyping = function() {
        if (!typingStarted) {
            Meteor.call('chats.started_typing', template.chatId, new Date());
            typingStarted = true;
        }
        if (stopTimeout) clearTimeout(stopTimeout);
        stopTimeout = setTimeout(template.stopTyping, 2000);
    };

    template.ajustScrollOffset = function() {
        var element = $('[data-reversed-scroller]')[0];
        if (!element) return;
        var pos = element.scrollTop;
        var height = element.scrollHeight - element.clientHeight;
        _.defer(function() {
            if (pos === height) {
                element.scrollTop = element.scrollHeight;
            }
        });
    };
});

Template.NetworkChat.onRendered(function() {
    Meteor.setTimeout(function() {
        $('[data-reversed-scroller]')[0].scrollTop = $('[data-reversed-scroller]')[0].scrollHeight;
        $('[data-reversed-scroller-wrapper]').addClass('pu-state-active');
    }, 500);
});

Template.NetworkChat.helpers({
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        return {
            activeUppers: function() {
                return Meteor.users.find({'status.online': true, _id: {$not: Meteor.userId()}});
            },
            messagesGroupedByDay: function(messages) {
                return Partup.client.chatmessages.groupByCreationDay(messages);
            },
            messagesGroupedByUser: function(messages) {
                return Partup.client.chatmessages.groupByCreatorId(messages);
            },
            messages: function() {
                template.ajustScrollOffset();
                return ChatMessages.find({}, {limit: 100, sort: {created_at: -1}}).fetch().reverse();
            },
            chat: function() {
                return Chats.findOne();
            }
        };
    }
});
Template.NetworkChat.events({
    'keydown [data-submit=return]': function(event, template) {
        template.startedTyping();
        // determine keycode (with cross browser compatibility)
        var pressedKey = event.which ? event.which : event.keyCode;

        // check if it's the 'return' key and if shift is NOT held down
        if (pressedKey == 13 && !event.shiftKey) {
            event.preventDefault();
            template.sendMessage();
        }
    },
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'click [data-flexible-center]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).parent().addClass('start');
        _.defer(function() {
            $(event.currentTarget).parent().addClass('active');
            $('[data-search]').focus();
        });
    },
    'click [data-send]': function(event, template) {
        event.preventDefault();
        template.sendMessage();
    },
    'click [data-clear]': function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        $('[data-search]').val('');
        _.defer(function() {
            template.throttledSetSearchQuery('');
            $('[data-search]').blur();
        });
    },
    'input [data-search]': function(event, template) {
        template.throttledSetSearchQuery(event.currentTarget.value);
    },
    'focus [data-search]': function(event, template) {
        $(event.currentTarget).parent().addClass('start');
        _.defer(function() {
            template.focussed = true;
            $(event.currentTarget).parent().addClass('active');
        });
    },
    'blur [data-search]': function(event, template) {
        if (!$(event.target).val()) {
            template.focussed = false;
            $('[data-flexible-center]').parent().removeClass('active');
        }
    },
    'mouseleave [data-flexible-center]': function(event, template) {
        if (!template.focussed) $(event.currentTarget).parent().removeClass('active');
    },
    'transitionend [data-flexible-center]': function(event, template) {
        $(event.currentTarget).parent().removeClass('start');
    }
});
