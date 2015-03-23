Meteor.methods({

    /**
     * Add a Supporter to a Partup
     *
     * @param {integer} partupId
     */
    'partups.supporters.insert': function (partupId) {
        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        var partup = Partups.findOneOrFail(partupId);

        try {
            var supporters = partup.supporters || [];
            var isAlreadySupporter = !! (supporters.indexOf(upper._id) > -1);

            if (! isAlreadySupporter) {
                Partups.update(partupId, { $push: { 'supporters': upper._id } });
                Event.emit('partups.supporters.inserted', partup, upper);

                return true;
            }

            return false;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be added as a supporter to Partup [' + partupId + '].');
        }
    },

    /**
     * Remove a Supporter from a Partup
     *
     * @param {integer} partupId
     */
    'partups.supporters.remove': function (partupId) {
        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        var partup = Partups.findOneOrFail(partupId);

        try {
            var supporters = partup.supporters || [];
            var isAlreadySupporter = !! (supporters.indexOf(upper._id) > -1);

            if (! isAlreadySupporter) {
                Partups.update(partupId, { $pull: { 'supporters': upper._id } });
                Event.emit('partups.supporters.removed', partup, upper);

                return true;
            }

            return false;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Upper [' + upper._id + '] could not be remove as a supporter from Partup [' + partupId + '].');
        }
    }

});
