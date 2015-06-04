/**
 @namespace Partup system messages service
 @name Partup.services.system_messages
 @memberOf partup.services
 */
Partup.services.system_messages = {
    /**
     * Create a system message
     *
     * @param  {mixed[]} upper
     * @param  {string} updateId
     * @param  {string} content
     *
     * @return {Update}
     */
    send: function(upper, updateId, content) {
        try {
            var update = Updates.findOneOrFail(updateId);

            Updates.update(update._id, {
                $set: {
                    updated_at: new Date()
                },
                $push: {
                    comments: {
                        _id: Random.id(),
                        content: content,
                        system: true,
                        creator: {
                            _id: upper._id,
                            name: upper.profile.name
                        },
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                },
                $inc: {
                    comments_count: 1
                }
            });
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'system-message-insert-failure');
        }
    }
};
