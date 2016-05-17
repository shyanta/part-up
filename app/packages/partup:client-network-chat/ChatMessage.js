Template.ChatMessage.onCreated(function() {
    var template = this;
    template.subscribe('users.one', template.data.data.creator_id);
});
Template.ChatMessage.helpers({
    data: function() {
        var data = Template.currentData().data;
        var user = Meteor.users.findOne(data.creator_id);
        return {
            creator: function() {
                return user;
            },
            messages: function() {
                data.messages[0].creator = user;
                return data.messages;
            }
        };
    }
});
