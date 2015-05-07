Meteor.methods({
    /**
     * Insert a Message
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'updates.messages.insert': function (partupId, fields) {
        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        var newMessage = Partup.transformers.update.fromFormNewMessage(fields, upper, partupId);
        newMessage.type = 'partups_message_added';

        try {
            newMessage._id = Updates.insert(newMessage);

            return {
                _id: newMessage._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'error-method-updates-messages-insert-failure');
        }
    },

    /**
     * Update a Message
     *
     * @param {string} updateId
     * @param {mixed[]} fields
     */
    'updates.messages.update': function (updateId, fields) {
        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');


        message.type = 'partups_message_updated';
        message.type_data = {
            old_value: message.new_value,
            new_value: fields.content
        };

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
                            new_value: fields.content
                        }
                    }
                }
            );

            return {
                _id: update._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'error-method-updates-messages-insert-failure');
        }
    }

});
