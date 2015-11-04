Meteor.methods({
    /**
     * Insert a tile
     *
     * @param {mixed[]} fields
     */
    'tiles.insert': function(fields) {
        //check(fields, Partup.schemas.forms.tile);

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        // Validate video url
        if (fields.video_url && !Partup.services.validators.isVideoUrl(fields.video_url)) {
            throw new Meteor.Error(400, 'video_url_invalid');
        }

        try {
            var latestUpperTile = Tiles.findOne({upper_id: upper._id, sort: {position: -1}});
            if (latestUpperTile) {
                var position = latestUpperTile.position + 1;
            } else {
                var position = 0;
            }
            var tile = {
                _id: Random.id(),
                upper_id: upper._id,
                type: fields.type,
                description: fields.description,
                position: position
            };

            if (fields.type === 'image') {
                tile.image_id = fields.image_id;
            } else if (fields.type === 'video') {
                tile.video_url = fields.video_url;
            }

            Tiles.insert(tile);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'tile_could_not_be_inserted');
        }
    },

    /**
     * Remove a tile
     *
     * @param {String} tileId
     */
    'tiles.remove': function(tileId) {
        check(tileId, String);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            Tiles.remove({_id: tileId});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'tile_could_not_be_removed');
        }
    },

    /**
     * return tiles of profile by userid
     *
     * @param {String} userId
     */
    'tiles.profile': function(userId) {
        check(userId, String);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            return Meteor.users.findOne(Meteor.userId()).profile.tiles || [];
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'blablabla');
        }
    }
});
