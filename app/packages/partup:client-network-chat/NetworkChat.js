Template.NetworkChat.onCreated(function() {
    var template = this;
    var networkSlug = template.data.networkSlug;
    template.subscribe('networks.one.chat', networkSlug, {
        onReady: function() {

        }
    });
    template.searchQuery = new ReactiveVar('', function(a, b) {
        if (a !== b) {
            // do something
        }
    });
    var setSearchQuery = function(query) {
        template.searchQuery.set(query);
        console.log('search search');
    };
    template.throttledSetSearchQuery = _.throttle(setSearchQuery, 500, {trailing: true});
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
            uppers: function() {
                return Meteor.users.find();
            },
            messages: function() {
                return ChatMessages.find();
            }
        };
    }
});
Template.NetworkChat.events({
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'click [data-flexible-center]': function(event, template) {
        event.preventDefault();
        $(event.currentTarget).parent().addClass('start');
        _.defer(function() {
            $(event.currentTarget).parent().addClass('active');
            $('[data-search]').focus();
        });
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
