Meteor.publishComposite('partups.discover', function(options) {
    var options = options || {};
    var limit = options.limit || 20;
    var query = options.query || false;
    var location = options.location || false;
    var networkId = options.networkId || false;
    var sort = options.sort || false;

    return {
        find: function() {
            var selector = {};
            var options = {};

            // Initialize
            options.sort = {};

            // Set limit for pagination
            options.limit = limit;

            // Sort the partups from the newest to the oldest
            if (sort === 'new') {
                options.sort['updated_at'] = -1;
            }

            // Sort the partups from the most popular to the least popular
            if (sort === 'popular') {
                options.sort['analytics.clicks_per_day'] = -1;
            }

            // Filter the partups that are in a given location
            if (location) {
                selector['location.city'] = location;
            }

            // Filter the partups that are in a given network
            if (networkId) {
                selector['network_id'] = networkId;
            }

            // Filter the partups that match the search query
            if (query) {
                Log.debug('Searching for [' + query + ']');

                selector['$text'] = {$search: query};
                options.fields = {score: {$meta: 'textScore'}};
                options.sort['score'] = {$meta: 'textScore'};
            }

            return Partups.find(selector, options);
        },
        children: [
            {
                find: function(partup) {
                    var uppers = partup.uppers || [];

                    // We only want to publish the first x uppers
                    uppers = uppers.slice(0, 4);

                    return Meteor.users.findMultiplePublicProfiles(uppers);
                }
            },
            {
                find: function(partup) {
                    var network = partup.network || {};

                    return Networks.find({_id: network._id}, {limit: 1});
                }
            }
        ]
    };
});

Meteor.publishComposite('partups.ids', function(partupIds) {
    return {
        find: function() {
            check(partupIds, Array);

            return Partups.find({_id: {$in: partupIds}});
        },
        children: [
            {
                find: function(partup) {
                    var uppers = partup.uppers || [];

                    // We only want to publish the first x uppers as can be seen in the design
                    uppers = uppers.slice(0, 4);
                    return Meteor.users.findMultiplePublicProfiles(uppers);
                }
            },
            {
                find: function(partup) {
                    var network = partup.network || {};

                    return Networks.find({_id: network._id}, {limit: 1});
                }
            }
        ]
    };
});

Meteor.publish('partups.list', function() {
    return Partups.find({}, {_id: 1, name: 1});
});

Meteor.publishComposite('partups.one.contributions', function(partupId) {
    return {
        find: function() {
            return Contributions.find({partup_id: partupId});
        },
        children: [
            {
                find: function(contribution) {
                    return Meteor.users.findSinglePublicProfile(contribution.upper_id);
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
                find: function(contribution) {
                    return Ratings.find({contribution_id: contribution._id});
                }
            },
            {
                find: function(contribution) {
                    return Updates.find({_id: contribution.update_id});
                }
            }
        ]
    };
});

Meteor.publishComposite('partups.one.updates', function(partupId, options) {
    var options = options || {};
    var limit = options.limit || 10;
    var filter = options.filter || 'default';

    var self = this;

    return {
        find: function() {
            var criteria = {partup_id: partupId};

            if (filter === 'my-updates') {
                criteria.upper_id = self.userId;
            } else if (filter === 'activities') {
                criteria.type = {$regex: '.*activities.*'};
            } else if (filter === 'partup-changes') {
                var regex = '.*(tags|end_date|name|description|image|budget).*';
                criteria.type = {$regex: regex};
            } else if (filter === 'messages') {
                criteria.type = {$regex: '.*message.*'};
            } else if (filter === 'contributions') {
                criteria.type = {$regex: '.*contributions.*'};
            }

            return Updates.find(criteria, {sort: {updated_at: -1}, limit:limit});
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

Meteor.publishComposite('partups.one', function(partupId) {
    return {
        find: function() {
            return Partups.find({_id: partupId}, {limit: 1});
        },
        children: [
            {
                find: function(partup) {
                    return Images.find({_id: partup.image}, {limit: 1});
                }
            },
            {
                find: function(partup) {
                    return Activities.find({partup_id: partup._id});
                }
            },
            {
                find: function(partup) {
                    var uppers = partup.uppers || [];
                    return Meteor.users.findMultiplePublicProfiles(uppers);
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
                find: function(partup) {
                    var supporters = partup.supporters || [];
                    return Meteor.users.findMultiplePublicProfiles(supporters);
                },
                children: [
                    {
                        find: function(user) {
                            return Images.find({_id: user.profile.image}, {limit: 1});
                        }
                    }
                ]
            }
        ]
    };
});
