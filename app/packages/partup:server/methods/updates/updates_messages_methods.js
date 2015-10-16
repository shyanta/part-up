Meteor.methods({
    /**
     * Insert a Message
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'updates.messages.insert': function(partupId, fields) {
        check(partupId, String);
        check(fields, Partup.schemas.forms.newMessage);

        this.unblock();

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        var partup = Partups.findOneOrFail(partupId);
        var newMessage = Partup.transformers.update.fromFormNewMessage(fields, upper, partup._id);
        newMessage.type = 'partups_message_added';

        try {
            newMessage._id = Updates.insert(newMessage);

            // Make user Supporter if it's not yet an Upper or Supporter of the Partup
            if (!partup.hasUpper(upper._id) && !partup.hasSupporter(upper._id)) {
                partup.makeSupporter(upper._id);

                Event.emit('partups.supporters.inserted', partup, upper);
            }

            Event.emit('partups.messages.insert', upper, partup, newMessage, fields.text);

            return {
                _id: newMessage._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'message_could_not_be_inserted');
        }
    },

    /**
     * Update a Message
     *
     * @param {string} updateId
     * @param {mixed[]} fields
     */
    'updates.messages.update': function(updateId, fields) {
        check(updateId, String);
        check(fields, Partup.schemas.forms.newMessage);

        this.unblock();

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        try {
            var message = Updates.findOne({_id: updateId, upper_id: upper._id});
            if (message) {
                Updates.update({_id: message._id}, {$set: {
                    'type_data.old_value': message.type_data.new_value,
                    'type_data.new_value': sanitizeHtml(fields.text, {
                        allowedTags: []
                    }),
                    images: fields.images,
                    updated_at: new Date()
                }});
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partup_message_could_not_be_updated');
        }
    }
});
