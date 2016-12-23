Partup.client.network = {
    displayTags: function(network) {
        if (!network) throw new Error('Please provide a network object if it is not an instance of Network');

        var slug = network.slug;
        var maxTags = 5;
        var tags = [];
        var commonTags = network.common_tags || [];
        var customTags = network.tags || [];

        _.times(maxTags, function(index) {
            var tag = commonTags[index];
            if (!tag) return;
            tags.push({
                tag: tag.tag,
                networkSlug: slug || ''
            });
        });

        if (tags.length === maxTags) return tags;

        _.times((maxTags - tags.length), function(index) {
            var tag = customTags[index];
            if (!tag) return;
            tags.push({
                tag: tag,
                networkSlug: slug || ''
            });
        });

        return tags;
    }
};
