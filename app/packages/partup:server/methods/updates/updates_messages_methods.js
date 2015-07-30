Meteor.methods({
    /**
     * Insert a Message
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'updates.messages.insert': function(partupId, fields) {
        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        var partup = Partups.findOneOrFail(partupId);
        var newMessage = Partup.transformers.update.fromFormNewMessage(fields, upper, partup._id);
        newMessage.type = 'partups_message_added';

        try {
            newMessage._id = Updates.insert(newMessage);

            // Make user Supporter if its not yet an Upper or Supporter of the Partup
            var isUpperInPartup = Partups.findOne({_id: partup._id, uppers: {$in: [upper._id]}}) ? true : false;
            var isUpperSupporterInPartup = Partups.findOne({_id: partup._id, supporters: {$in: [upper._id]}}) ? true : false;

            if (!isUpperInPartup && !isUpperSupporterInPartup) {
                Partups.update(partup._id, {$addToSet: {'supporters': upper._id}});
                Meteor.users.update(upper._id, {$addToSet: {'supporterOf': partup._id}});

                Event.emit('partups.supporters.inserted', partup, upper);
            }

            Event.emit('partups.messages.insert', partup, upper);

            return {
                _id: newMessage._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'InsertFailure');
        }
    },

    /**
     * Update a Message
     *
     * @param {string} updateId
     * @param {mixed[]} fields
     */
    'updates.messages.edit': function(updateId, fields) {
        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        try {
            var update = Updates.findOneOrFail(updateId);

            Updates.update({
                    _id: update._id
                },
                {
                    $set: {
                        type: 'partups_message_updated',
                        type_data: {
                            old_value: update.new_value,
                            new_value: fields.text,
                            images: fields.images
                        },
                        updated_at: new Date()
                    }
                }
            );

            return {
                _id: update._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'InsertFailure');
        }
    }
});
