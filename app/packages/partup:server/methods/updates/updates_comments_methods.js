Meteor.methods({
    /**
     * Insert a Comment on an Update
     *
     * @param {string} updateId
     * @param {mixed[]} fields
     */
    'updates.comments.insert': function(updateId, fields) {
        check(fields, Partup.schemas.forms.updateComment);

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        var update = Updates.findOneOrFail(updateId);

        if (!!update.system) throw new Meteor.Error(403, 'Cannot insert comments in system updates');

        var comment = {
            _id: Random.id(),
            content: fields.content,
            type: fields.type,
            creator: {
                _id: upper._id,
                name: upper.profile.name,
                image: upper.profile.image
            },
            created_at: new Date(),
            updated_at: new Date()
        };

        check(comment, Partup.schemas.entities.updateComment);

        var comments = update.comments || [];

        try {
            // Check if the comment is made on an activity or contribution to change update title,
            // or leave it as it is. Also leave the upper_id to the original user if it's not
            var updateFields = {
                updated_at: new Date(),
                type: update.type
            };

            if (update.type_data.activity_id && update.type_data.contribution_id) {
                updateFields.type = 'partups_contributions_comments_added';
                updateFields.upper_id = upper._id;
            } else if (update.type_data.activity_id) {
                updateFields.type = 'partups_activities_comments_added';
                updateFields.upper_id = upper._id;
            }

            Updates.update(updateId, {
                $set: updateFields,
                $push: {
                    comments: comment
                },
                $inc: {
                    comments_count: 1
                }
            });

            // Make user Supporter if its not yet an Upper or Supporter of the Partup
            var isUpperInPartup = !!Partups.findOne({
                _id: update.partup_id,
                uppers: {$in: [upper._id]}
            });
            var isUpperSupporterInPartup = !!Partups.findOne({
                _id: update.partup_id,
                supporters: {$in: [upper._id]}
            });

            var partup = Partups.findOneOrFail(update.partup_id);
            if (!isUpperInPartup && !isUpperSupporterInPartup) {
                Partups.update(partup._id, {$addToSet: {'supporters': upper._id}});
                Meteor.users.update(upper._id, {$addToSet: {'supporterOf': partup._id}});

                Event.emit('partups.supporters.inserted', partup, upper);
            }

            Event.emit('updates.comments.inserted', upper, partup, update, comment);

            return {
                _id: comment._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'updates-comments-insert-failure');
        }
    }
});
