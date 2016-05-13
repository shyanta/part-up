Template.ChatMessage.onCreated(function() {
    var template = this;
});
Template.ChatMessage.helpers({
    data: function() {
        var data = Template.currentData().data;
        var user = Meteor.users.findOne(data.creator_id);
        return {
            creator_id: function() {
                return data.creator_id;
            },
            messages: function() {
                data.messages[0].creator = user;
                return data.messages;
            }
        };
    }
});
