Meteor.methods({
    /**
     * Insert a Comment on an Update
     *
     * @param {mixed[]} fields
     */
    'updates.comments.insert': function (updateId, fields) {
        // TODO: Validation

        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        var update = Updates.findOneOrFail(updateId);

        try {
            fields.created_at = Date.now();
            fields.updated_at = Date.now();
            fields.update_id = update._id;

            fields.creator = {
                _id: upper._id
            };

            if (upper.profile && upper.profile.name) {
                fields.creator.name = upper.profile.name;
            }

            fields._id = new Meteor.Collection.ObjectID();

            var comments = update.comments || [];

            Updates.update(updateId, { $push: { 'comments': fields }});

            Event.emit('updates.comments.inserted', fields);

            return {
                _id: fields._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'updates-comments-insert-failure');
        }
    },

});
