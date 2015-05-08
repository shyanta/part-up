Meteor.methods({
    /**
     * Insert a Comment on an Update
     *
     * @param {string} updateId
     * @param {mixed[]} fields
     */
    'updates.comments.insert': function (updateId, fields) {
        check(fields, Partup.schemas.forms.updateComment);

        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        var update = Updates.findOneOrFail(updateId);

        var comment = {
            _id: Random.id(),
            content: fields.content,
            creator: {
                _id: upper._id,
                name: upper.profile.name
            },
            created_at: new Date(),
            updated_at: new Date()
        };

        check(comment, Partup.schemas.entities.updateComment);

        var comments = update.comments || [];

        try {
            Updates.update(updateId, { $set: { 'updated_at': new Date() }, $push: { 'comments': comment }});

            Event.emit('updates.comments.inserted', comment);

            return {
                _id: comment._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'updates-comments-insert-failure');
        }
    },

});
