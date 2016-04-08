Template.NetworkSettingsAbout.onCreated(function() {
    var template = this;
    var userId = Meteor.userId();

    template.subscription = template.subscribe('networks.one', template.data.networkSlug, {
        onReady: function() {
            var network = Networks.findOne({slug: template.data.networkSlug});
            if (!network) Router.pageNotFound('network');
            if (network.isClosedForUpper(userId)) {
                Router.pageNotFound('network');
            }
        }
    });
    template.subscribe('contentblocks.by_network_slug', template.data.networkSlug, {
        onReady: function() {
            console.log('done');
        }
    });
    template.charactersLeft = new ReactiveDict();
    template.submitting = new ReactiveVar();
    template.current = new ReactiveDict();
    template.uploading = new ReactiveDict();

    template.locationSelection = new ReactiveVar();

});

Template.NetworkSettingsAbout.helpers({
    config: function() {
        var template = Template.instance();
        return {
            introFormSettings: function() {
                return {
                    type: 'intro'
                };
            }
        };
    },
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;
        var contentBlocksArr = network.contentblocks || [];
        var contentBlocks = ContentBlocks.find({_id: {$in: contentBlocksArr}});

        return {
            network: function() {
                return network;
            },
            contentBlocks: function() {
                console.log(contentBlocks)
                return contentBlocks;
            }
        };
    }
});


