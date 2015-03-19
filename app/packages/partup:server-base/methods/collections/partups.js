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
    },

    /**
     * Add a Supporter to a Partup
     *
     * @param {integer} partupId
     * @param {integer} upperId
     */
    'collections.partups.supporters.insert': function (partupId, upperId) {
        // TODO: Authorisation & Validation

        // TODO: Update as soon as the users are ready
        // var upper = Users.findOne(upperId);
        var upper = { _id: upperId };
        if (! upper) throw new Meteor.Error(404, 'Upper [' + upperId + '] was not found.');

        var partup = Partups.findOne(partupId);
        if (! partup) throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');

        try {
            var supporters = partup.supporters || [];

            if (supporters.indexOf(upperId) === -1) {
                supporters.push(upperId);

                Partups.update(partupId, { $set: { 'supporters': supporters } });

                Event.emit('collections.partups.supporters.inserted', partup, upper);
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upperId + '] could not be added as a supporter to Partup [' + partupId + '].');
        }
    },

    /**
     * Remove a Supporter from a Partup
     *
     * @param {integer} partupId
     * @param {integer} upperId
     */
    'collections.partups.supporters.remove': function (partupId, upperId) {
        // TODO: Authorisation & Validation

        // TODO: Update as soon as the users are ready
        // var upper = Users.findOne(upperId);
        var upper = { _id: upperId };
        if (! upper) throw new Meteor.Error(404, 'Upper [' + upperId + '] was not found.');

        var partup = Partups.findOne(partupId);
        if (! partup) throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');

        try {
            var supporters = partup.supporters || [];

            if (supporters.length === 0 || supporters.indexOf(upperId) > -1) {
                supporters.splice(supporters.indexOf(upperId), 1);

                Partups.update(partupId, { $set: { 'supporters': supporters } });

                Event.emit('collections.partups.supporters.removed', partup, upper);
            }
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upperId + '] could not be remove as a supporter from Partup [' + partupId + '].');
        }
    }

});
