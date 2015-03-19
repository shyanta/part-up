Meteor.methods({

    /**
     * Insert a Partup
     *
     * @param {mixed[]} fields
     */
    'collections.partups.insert': function (fields) {
        check(fields, Partup.schemas.forms.startPartup);

        var upper = Meteor.user();

        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            fields.creator_id = upper._id;
            fields._id = Partups.insert(fields);

            Event.emitCollectionInsert(Partups, fields);

            return fields._id;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Partup could not be inserted.');
        }
    },

    /**
     * Update a Partup
     *
     * @param {integer} partupId
     * @param {mixed[]} fields
     */
    'collections.partups.update': function (partupId, fields) {
        // TODO: Validation

        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (! upper || partup.creator_id !== upper.creator_id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Partups.update(partupId, { $set: fields });
            Event.emitCollectionUpdate(Partups, partup, fields);

            return partup._id;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Partup [' + partupId + '] could not be updated.');
        }
    },

    /**
     * Remove a Partup
     *
     * @param {integer} partupId
     */
    'collections.partups.remove': function (partupId) {
        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (! upper || partup.creator_id !== upper.creator_id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Partups.remove(partupId);
            Event.emitCollectionRemove(Partups, partup);

            return partup._id;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Partup [' + partupId + '] could not be removed.');
        }
    }

});
