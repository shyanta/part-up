Meteor.methods({

    /**
     * Insert a Partup
     *
     * @param {[mixed]} fields
     */
    'collections.partups.insert': function (fields) {
        // TODO: Authorisation
        check(fields, Partup.schemas.partup);

        try {
            fields._id = Partups.insert(fields);

            Event.emitCollectionInsert(Partups, fields);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Partup could not be inserted.');
        }
    },

    /**
     * Update a Partup
     *
     * @param {integer} partupId
     * @param {[mixed]} fields
     */
    'collections.partups.update': function (partupId, fields) {
        // TODO: Authorisation & Validation

        var partup = Partups.findOne(partupId);

        if (! partup) {
            throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');
        }

        try {
            Partups.update(partupId, { $set: fields });
            Event.emitCollectionUpdate(Partups, partup, fields);
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
        // TODO: Authorisation

        var partup = Partups.findOne(partupId);

        if (! partup) throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');

        try {
            Partups.remove(partupId);
            Event.emitCollectionRemove(Partups, partup);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Partup [' + partupId + '] could not be removed.');
        }
    }

});
