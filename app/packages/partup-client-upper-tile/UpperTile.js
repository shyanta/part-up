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
                var userId = Meteor.userId();
                return (Chats.findForUser(userId, {private: true}) || [])
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
    },
    roleLabel: function() {
        var template = Template.instance();
        var network = template.data.network;
        return {
            admin: function() {
                return TAPi18n.__('network-uppers-access-level-label-admin', {
                    label: ((network.privacy_type_labels && network.privacy_type_labels[6]) || TAPi18n.__('network-uppers-access-level-label-admin-default'))
                });
            },
            collegue: function() {
                return TAPi18n.__('network-uppers-access-level-label-collegue', {
                    label: ((network.privacy_type_labels && network.privacy_type_labels[7]) || TAPi18n.__('network-uppers-access-level-label-collegue-default'))
                });
            },
            customA: function() {
                return TAPi18n.__('network-uppers-access-level-label-custom-a', {
                    label: ((network.privacy_type_labels && network.privacy_type_labels[8]) || TAPi18n.__('network-uppers-access-level-label-custom-a-default'))
                });
            },
            customB: function() {
                return TAPi18n.__('network-uppers-access-level-label-custom-b', {
                    label: ((network.privacy_type_labels && network.privacy_type_labels[9]) || TAPi18n.__('network-uppers-access-level-label-custom-b-default'))
                });
            }
        }
    }
});
