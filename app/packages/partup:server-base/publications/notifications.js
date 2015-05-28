Meteor.publishComposite('notifications.user', function() {
    var self = this;

    return {
        find: function() {
            return Notifications.find({ for_upper_id: self.userId }, { limit: 20 });
        },
        children: [
            {
                find: function(notification) {
                    var images = [];

                    if (notification.type === 'partups_supporters_added') {
                        images.push(notification.type_data.supporter.image);
                    }

                    return Images.find({ _id: { $in: images } });
                }
            }
        ]
    };
});
