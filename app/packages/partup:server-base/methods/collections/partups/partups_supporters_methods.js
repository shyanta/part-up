Meteor.methods({

    /**
     * Add a Supporter to a Partup
     *
     * @param {integer} partupId
     * @param {integer} upperId
     */
    'collections.partups.supporters.insert': function (partupId, upperId) {
        // TODO: Authorisation & Validation

        // TODO: Update as soon as the users are ready
        // var upper = Users.findOneOrFail(upperId);
        var upper = { _id: upperId };
        var partup = Partups.findOneOrFail(partupId);

        try {
            Partups.update(partupId, { $addToSet: { 'supporters': upperId } });
            Event.emit('collections.partups.supporters.inserted', partup, upper);
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
        // var upper = Users.findOneOrFail(upperId);
        var upper = { _id: upperId };
        var partup = Partups.findOneOrFail(partupId);

        try {
            Partups.update(partupId, { $pull: { 'supporters': upperId } });
            Event.emit('collections.partups.supporters.removed', partup, upper);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upperId + '] could not be remove as a supporter from Partup [' + partupId + '].');
        }
    }

});
