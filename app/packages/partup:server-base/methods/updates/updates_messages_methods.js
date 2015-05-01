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

});
