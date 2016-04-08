Meteor.methods({
    /**
     * Insert a contentBlock
     *
     * @param {mixed[]} fields
     */
    'contentblocks.insert': function(fields) {
        check(fields, Partup.schemas.forms.contentBlock);

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        try {
            var contentBlockData = Partup.transformers.contentBlock.fromFormContentBlock(fields);
            contentBlockData._id = Random.id();

            ContentBlocks.insert(contentBlockData);

            return {
                _id: contentBlockData._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'contentblock_could_not_be_inserted');
        }
    },

    /**
     * Update a contentBlock
     *
     * @param {String} contentBlockId
     * @param {mixed[]} fields
     */
    'contentblocks.update': function(contentBlockId, fields) {
        check(contentBlockId, String);
        check(fields, Partup.schemas.forms.contentBlock);

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        try {
            var contentBlockData = Partup.transformers.contentBlock.fromFormContentBlock(fields);

            ContentBlocks.update(contentBlockId, {$set: contentBlockData});

            return {
                _id: contentBlockData._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'contentblock_could_not_be_updated');
        }
    },

    /**
     * Remove a contentBlock
     *
     * @param {String} networkSlug
     * @param {String} contentBlockId
     */
    'contentblocks.remove': function(networkSlug, contentBlockId) {
        check(networkSlug, String);
        check(contentBlockId, String);
        // @TODO better solution
        //var user = Meteor.user();
        //var network = Networks.findOneOrFail({slug: networkSlug});
        //
        //if (!user) throw new Meteor.Error(401, 'unauthorized');
        //
        //
        //try {
        //    ContentBlocks.remove({_id: contentBlockId});
        //    networks.update(networkId, {$pull: {contentblocks: contentBlockId}});
        //} catch (error) {
        //    Log.error(error);
        //    throw new Meteor.Error(400, 'contentblock_could_not_be_removed');
        //}
    }
});
