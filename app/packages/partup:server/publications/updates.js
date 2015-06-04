Meteor.publishComposite('updates.one', function(updateId) {
    return {
        find: function() {
            return Updates.find({_id: updateId});
        },
        children: [
            {
                find: function(update) {
                    return Meteor.users.find({_id: update.upper_id}, {limit: 1, fields: {'profile': 1, 'status.online': 1, 'partups': 1, 'upperOf': 1, 'supporterOf': 1}});
                },
                children: [
                    {
                        find: function(user) {
                            return Images.find({_id: user.profile.image}, {limit: 1});
                        }
                    }
                ]
            },
            {
                find: function(update) {
                    var images = [];

                    if (update.type === 'partups_image_changed') {
                        images = [update.type_data.old_image, update.type_data.new_image];
                    }

                    if (update.type === 'partups_message_added') {
                        images = update.type_data.images;
                    }

                    return Images.find({_id: {$in: images}});
                }
            }
        ]
    };
});
