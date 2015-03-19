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
        // var upper = Users.findOne(upperId);
        var upper = { _id: upperId };
        if (! upper) throw new Meteor.Error(404, 'Upper [' + upperId + '] was not found.');

        var partup = Partups.findOne(partupId);
        if (! partup) throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');

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
        // var upper = Users.findOne(upperId);
        var upper = { _id: upperId };
        if (! upper) throw new Meteor.Error(404, 'Upper [' + upperId + '] was not found.');

        var partup = Partups.findOne(partupId);
        if (! partup) throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');

        try {
            Partups.update(partupId, { $pull: { 'supporters': upperId } });
            Event.emit('collections.partups.supporters.removed', partup, upper);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upperId + '] could not be remove as a supporter from Partup [' + partupId + '].');
        }
    }

});
