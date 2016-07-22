Template.app_chat.onCreated(function() {
    var template = this;

    template.onLogout = function() {
        Router.go('home');
    };
    Partup.client.user.onBeforeLogout(template.onLogout);
});

Template.app_chat.onDestroyed(function() {
    var template = this;
    Partup.client.user.offBeforeLogout(template.onLogout);
});

Template.app_chat.helpers({
    chatId: function() {
        var template = Template.instance();
        return template.data ? template.data.chatId : undefined;
    },
    startChatUserId: function() {
        var template = Template.instance();
        return template.data ? template.data.startChatUserId : undefined;
    }
});
