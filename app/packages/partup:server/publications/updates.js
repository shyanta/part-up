Meteor.publishComposite('updates.one', function(updateId) {
    return {
        find: function() {
            return Updates.find({_id: updateId});
        },
        children: [
            {
                find: function(update) {
                    return Meteor.users.findSinglePublicProfile(update.upper_id);
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

Meteor.publishComposite('updates.from_partup', function(partupId, options) {
    var options = options || {};
    var limit = options.limit || 10;
    var filter = options.filter || 'default';

    var self = this;

    return {
        find: function() {
            // return Partups.guardedFind(self.userId, {_id: partupId}, {limit:1});
            return Partups.find({_id: partupId}, {limit:1});
        },
        children: [
            {
                find: function(partup) {
                    return Updates.findByFilter(partup._id, filter, limit);
                },
                children: [
                    {
                        find: function(update) {
                            return Meteor.users.findSinglePublicProfile(update.upper_id);
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
            }
        ]
    };
});
