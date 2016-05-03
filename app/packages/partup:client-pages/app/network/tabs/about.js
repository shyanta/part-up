Template.app_network_about.onCreated(function() {
    var template = this;
    template.subscribe('contentblocks.by_network_slug', template.data.networkSlug);
    var network = Networks.findOne({slug: template.data.networkSlug});
    template.subscribe('users.by_ids', network.admins);
});

Template.app_network_about.helpers({
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;
        var contentBlocksArr = network.contentblocks || [];
        var introBlock = ContentBlocks.findOne({_id: {$in: contentBlocksArr}, type: 'intro'});
        var contentBlocks = ContentBlocks.find({_id: {$in: contentBlocksArr}, type: 'paragraph'});

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
            imageUrl: function(imageId) {
                if (!imageId) return false;
                if (imageId) {
                    var image = Images.findOne({_id: imageId});
                    if (image) return Partup.helpers.url.getImageUrl(image, '360x360');
                }
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
