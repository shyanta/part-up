Template.UpperTile.onCreated(function() {
    var user = this.data.user;

    user.participation_scoreReadable = User(user).getReadableScore();
    user.supporterOf = user.supporterOf || [];
    user.upperOf = user.upperOf || [];
    user.profile.imageObject = user.profile.imageObject || Images.findOne({_id: user.profile.image});
});

Template.UpperTile.helpers({
    p: function() {
        var profile = Template.instance().data.user;
        return {
            chatIdWithCurrentUser: function() {
                return Chats
                    .findForUser(Meteor.userId(), {private: true})
                    .map(function(chat) {
                        return chat._id;
                    })
                    .filter(function(chatId) {
                        var chats = profile.chats || [];
                        return chats.indexOf(chatId) > -1;
                    })
                    .pop();
            },
            startChatQuery: function() {
                return 'user_id=' + profile._id;
            }
        };
    }
});
