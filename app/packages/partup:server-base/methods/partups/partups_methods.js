Meteor.methods({

    /**
     * Insert a Partup
     *
     * @param {mixed[]} fields
     */
    'partups.insert': function (fields) {
        check(fields, Partup.schemas.forms.startPartup);

        var upper = Meteor.user();

        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            var newPartup = Partup.transformers.partup.fromFormStartPartup(fields, upper);

            //check(newPartup, Partup.schemas.entities.partup);

            newPartup._id = Partups.insert(newPartup);

            return {
                _id: newPartup._id
            };
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
    'partups.update': function (partupId, fields) {

        check(fields, Partup.schemas.forms.startPartup);

        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (! upper || partup.creator_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var newPartupFields = Partup.transformers.partup.fromFormStartPartup(fields, upper);

            Partups.update(partupId, { $set: newPartupFields });

            return {
                _id: partup._id
            };
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
    'partups.remove': function (partupId) {
        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (! upper || partup.creator_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Partups.remove(partupId);

            return {
                _id: partup._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Partup [' + partupId + '] could not be removed.');
        }
    },

    /**
     * Invite a someone to a Partup
     *
     * @param  {String} partupId
     */
    'partups.invite': function (partupId, email, name) {
        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        Email.send({
            to: email,
            subject: '@Invitation to Partup',
            html: '#yolo'
        });
    }

});
