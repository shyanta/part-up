Meteor.publishComposite('partups.discover', function(options) {
    var self = this;

    return {
        find: function() {
            return Partups.findForDiscover(self.userId, options);
        },
        children: [
            {
                find: function(partup) {
                    return Images.find({_id: partup.image}, {limit: 1});
                }
            },
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
                },
                children: [
                    {
                        find: function(network) {
                            return Images.find({_id: network.image}, {limit: 1});
                        }
                    }
                ]
            }
        ]
    };
});

Meteor.publish('partups.discover.count', function(options) {
    var self = this;

    options = options || {};
    options.count = true;

    Counts.publish(this, 'partups.discover.filterquery', Partups.findForDiscover(self.userId, options));
});

Meteor.publishComposite('partups.ids', function(partupIds) {
    var self = this;

    return {
        find: function() {
            check(partupIds, Array);

            return Partups.guardedFind(self.userId, {_id: {$in: partupIds}});
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
                },
                children: [
                    {
                        find: function(network) {
                            return Images.find({_id: network.image}, {limit: 1});
                        }
                    }
                ]
            }
        ]
    };
});

Meteor.publish('partups.list', function() {
    var self = this;

    return Partups.guardedFind(self.userId, {}, {_id: 1, name: 1});
});

/**
 * Publish all required data for a part-up's metadata
 *
 * This subscription will first check if the current user is allowed to view the
 * requested part-up. If so, the client will be allowed access to:
 *
 * - The part-up
 *   - Part-up's image
 *   - Public profiles + profile images for all uppers & supporters
 *   - The part-up's network
 *
 * @param {String} partupId - The part-up's id
 */
Meteor.publishComposite('partups.metadata', function(partupId) {
    var self = this;

    return {
        // Use guarded find to check if current user has access to the part-up
        find: function() {
            return Partups.guardedFind(self.userId, {_id: partupId}, {limit: 1});
        },
        children: [
            // Find the part-up's image
            {
                find: function(partup) {
                    return Images.find({_id: partup.image}, {limit: 1});
                }
            },

            // Find all uppers' public profile + profile image
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

            // Find all supporters' public profile + profile image
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
            },

            // Find the associated network
            {
                find: function(partup) {
                    return Networks.find({_id: partup.network_id}, {limit: 1});
                }
            }
        ]
    };
});

Meteor.publishComposite('partups.one', function(partupId) {
    var self = this;

    return {
        find: function() {
            return Partups.guardedFind(self.userId, {_id: partupId}, {limit: 1});
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
                },
                children: [
                    {
                        find: function(activity) {
                            return Updates.find({_id: activity.update_id});
                        }
                    }
                ]
            },
            {
                find: function(partup) {
                    return Contributions.find({partup_id: partup._id});
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
            },
            {
                find: function(partup) {
                    return Networks.find({_id: partup.network_id});
                }
            }
        ]
    };
});
