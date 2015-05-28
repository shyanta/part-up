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
            Updates.update(updateId, {
                $set: {
                    updated_at: new Date(),
                    upper_id: upper._id,
                    type: 'partups_comments_added'
                },
                $push: {
                    comments: comment
                },
                $inc: {
                    comments_count: 1
                }
            });

            // Make user Supporter if its not yet an Upper or Supporter of the Partup
            var isUpperInPartup = Partups.findOne({ _id: update.partup_id, uppers: { $in: [upper._id] } }) ? true : false;
            var isUpperSupporterInPartup = Partups.findOne({ _id: update.partup_id, supporters: { $in: [upper._id] } }) ? true : false;

            if (!isUpperInPartup && !isUpperSupporterInPartup) {
                var partup = Partups.findOneOrFail(update.partup_id);
                Partups.update(partup._id, { $push: { 'supporters': upper._id } });
                Meteor.users.update(upper._id, { $push: { 'supporterOf': partup._id } });

                Event.emit('partups.supporters.inserted', partup, upper);
            }

            Event.emit('updates.comments.inserted', comment);

            return {
                _id: comment._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'updates-comments-insert-failure');
        }
    }
});
