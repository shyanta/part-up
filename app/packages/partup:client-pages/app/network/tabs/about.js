Template.app_network_about.onCreated(function() {
    var template = this;
    template.contentblocksAvailable = new ReactiveVar(false);
    template.subscribe('contentblocks.by_network_slug', template.data.networkSlug, {
        onReady: function() {
            template.contentblocksAvailable.set(true);
        }
    });
    var network = Networks.findOne({slug: template.data.networkSlug});
    template.subscribe('users.by_ids', network.admins);
});

Template.app_network_about.helpers({
    state: function() {
        var template = Template.instance();
        return {
            contentblocksAvailable: function() {
                return template.contentblocksAvailable.get();
            }
        };
    },
    data: function() {
        var compare = function(a, b) {
            var first = contentBlocksArr.indexOf(a._id);
            var second = contentBlocksArr.indexOf(b._id);
            return first > second;
        };
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;
        var contentBlocksArr = network.contentblocks || [];
        var introBlock = ContentBlocks.findOne({_id: {$in: contentBlocksArr}, type: 'intro'});
        var contentBlocks = ContentBlocks.find({_id: {$in: contentBlocksArr}, type: 'paragraph'}).fetch().sort(compare);

        if (network && introBlock) {
            introBlock.tags = network.tags || [];
            introBlock.website = network.website || false;
            introBlock.location = network.location || false;
        }

        return {
            network: function() {
                return network;
            },
            introBlock: function() {
                return introBlock;
            },
            contentBlocks: function() {
                return contentBlocks;
            },
            admins: function() {
                return Meteor.users.find({_id: {$in: network.admins}});
            },
            email: function(user) {
                return User(user).getEmail();
            }
        };
    }
});
