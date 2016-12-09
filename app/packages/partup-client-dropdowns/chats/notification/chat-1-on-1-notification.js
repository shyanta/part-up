Template.ChatOneOnOneNotification.helpers({
    notificationName: function() {
        return 'notification_' + this.notification.type;
    },
    chatQuery: function() {
        var template = Template.instance();
        return 'chat-id=' + template.data.chat._id;
    },
    chat: function() {
        return Template.instance().data.chat;
    },
    formatted: function(content) {
        return new Partup.client.message(content)
            .sanitize()
            .parseMentions({link: false})
            .emojify()
            .getContent();
    }
});

Template.ChatOneOnOneNotification.events({
    'click [href]': function(event) {
        Partup.client.browser.onMobileOs(function() {
            event.preventDefault();
            var appStoreLink = Partup.client.browser.getAppStoreLink();
            window.open(appStoreLink, '_blank');
        });
    },
    'click [data-notification]': function(event, template) {
        var notificationId = $(event.currentTarget).data('notification');
        template.data.onClick();
    }
});
