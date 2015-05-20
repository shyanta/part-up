Meteor.publish('partups.all', function () {
    return Partups.find({});
});

Meteor.publish('partups.recent', function () {
    return Partups.find({}, { sort: { createdAt: -1 }, limit: 3 });
});

Meteor.publish('partups.supported', function () {
    return Partups.find({});
});

Meteor.publishComposite('partups.one.activities', function (partupId) {
    return {
        find: function() {
            return Activities.find({ partup_id: partupId });
        },
        children: [
            {
                find: function(activity) {
                    return Updates.find({ _id: activity.update_id }, { limit: 1, fields: { 'comments_count': 1 } });
                }
            }
        ]
    };
});

Meteor.publishComposite('partups.one.contributions', function(partupId) {
    return {
        find: function() {
            return Contributions.find({ partup_id: partupId });
        },
        children: [
            {
                find: function(contribution) {
                    return Meteor.users.find({ _id: contribution.upper_id }, { limit: 1, fields: { 'profile': 1, 'status.online': 1, 'partups': 1, 'supporterOf': 1 } });
                },
                children: [
                    {
                        find: function(user) {
                            return Images.find({ _id: user.profile.image }, { limit: 1 });
                        }
                    }
                ]
            }
        ]
    };
});

Meteor.publishComposite('partups.one.updates', function(partupId) {
    return {
        find: function() {
            return Updates.find({ partup_id: partupId });
        },
        children: [
            {
                find: function(update) {
                    return Meteor.users.find({ _id: update.upper_id }, { limit: 1, fields: { 'profile': 1, 'status.online': 1, 'partups': 1, 'supporterOf': 1 } });
                },
                children: [
                    {
                        find: function(user) {
                            return Images.find({ _id: user.profile.image }, { limit: 1 });
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

                    return Images.find({ _id: { $in: images } });
                }
            }
        ]
    };
});

Meteor.publishComposite('partups.one', function(partupId) {
    return {
        find: function() {
            return Partups.find({ _id: partupId }, { limit: 1 });
        },
        children: [
            {
                find: function(partup) {
                    return Images.find({ _id: partup.image }, { limit: 1 });
                }
            },
            {
                find: function(partup) {
                    var uppers = partup.uppers || [];
                    return Meteor.users.find({ _id: { $in: uppers }}, { fields: { 'profile': 1, 'status.online': 1, 'partups': 1, 'supporterOf': 1 } });
                },
                children: [
                    {
                        find: function(user) {
                            return Images.find({ _id: user.profile.image }, { limit: 1 });
                        }
                    }
                ]
            },
            {
                find: function(partup) {
                    var supporters = partup.supporters || [];
                    return Meteor.users.find({ _id: { $in: supporters }}, { fields: { 'profile': 1, 'status.online': 1, 'partups': 1, 'supporterOf': 1 } });
                },
                children: [
                    {
                        find: function(user) {
                            return Images.find({ _id: user.profile.image }, { limit: 1 });
                        }
                    }
                ]
            }
        ]
    };
});
