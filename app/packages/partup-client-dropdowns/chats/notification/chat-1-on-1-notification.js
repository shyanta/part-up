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
    }
});

Template.ChatOneOnOneNotification.events({
    'click [data-notification]': function(event, template) {
        var notificationId = $(event.currentTarget).data('notification');
        template.data.onClick();
    }
});
