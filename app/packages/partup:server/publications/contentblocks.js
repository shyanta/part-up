Meteor.publishComposite('contentblocks.by_network_slug', function(networkSlug) {
    check(networkSlug, String);

    this.unblock();

    return {
        find: function() {
            var network = Networks.guardedFind(this.userId, {slug: networkSlug}).fetch().pop();
            if (!network) return;

            var contentBlocks = network.contentblocks || [];
            return ContentBlocks.find({_id: {$in: contentBlocks}});
        },
        children: [
            {find: Images.findForContentBlock}
        ]
    };
});
