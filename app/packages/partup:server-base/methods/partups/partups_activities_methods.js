Meteor.methods({
    /**
     * Insert an Activity
     *
     * @param {mixed[]} fields
     */
    'partups.activities.insert': function (partupId, fields) {
        // TODO: Validation

        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        var partup = Partups.findOneOrFail(partupId);

        try {
            fields.created_at = Date.now();
            fields.updated_at = Date.now();
            fields.creator_id = upper._id;
            fields.partup_id = partup._id;
            fields._id = Activities.insert(fields);

            Event.emit('partups.activities.inserted', fields);

            return {
                _id: fields._id
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Activity could not be inserted.');
        }
    },

});
