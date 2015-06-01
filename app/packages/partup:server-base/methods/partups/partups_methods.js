Meteor.methods({

    /**
     * Insert a Partup
     *
     * @param {mixed[]} fields
     */
    'partups.insert': function (fields, extraFields) {

        check(fields, Partup.schemas.forms.startPartup);

        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            var newPartup = Partup.transformers.partup.fromFormStartPartup(fields);
            newPartup.uppers = [upper._id];
            newPartup.creator_id = upper._id;
            newPartup.created_at = new Date();

            //check(newPartup, Partup.schemas.entities.partup);

            newPartup._id = Partups.insert(newPartup);
            Meteor.users.update(upper._id, { $push: { 'partups': newPartup._id } });
            Meteor.users.update(upper._id, { $push: { 'upperOf': newPartup._id } });

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
    'partups.update': function (partupId, fields, extraFields) {

        check(fields, Partup.schemas.forms.startPartup);

        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);
        var uppers = partup.uppers || [];

        if (! upper || uppers.indexOf(upper._id) === -1) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var newPartupFields = Partup.transformers.partup.fromFormStartPartup(fields);

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
     * @param {string} partupId
     */
    'partups.remove': function (partupId) {
        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (!upper && partup.creator_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var supporters = partup.supporters || [];
            var uppers = partup.uppers || [];
            Meteor.users.update({ _id: { $in: supporters } }, { $pull: { 'supporterOf': partupId } }, { multi: true });
            Meteor.users.update({ _id: { $in: uppers } }, { $pull: { 'upperOf': partupId } }, { multi: true });

            Images.remove(partup.image);
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
     * Invite someone to a Partup
     *
     * @param  {String} partupId
     */
    'partups.invite': function (partupId, email, name) {
        var upper = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (! upper) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        var invites = partup.invites || [];
        var invitedEmails = mout.array.pluck(invites, 'email');

        if (invitedEmails.indexOf(email) > -1) {
            throw new Meteor.Error(403, 'Email is already invited to the given partup.');
        }

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUser.html'));
        var url = Meteor.absoluteUrl() + 'partups/' + partup._id ;

        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: email,
            subject: 'Uitnodiging voor Part-up ' + partup.name,
            html: SSR.render('inviteUserEmail', {
                name: name,
                partupName: partup.name,
                partupDescription: partup.description,
                inviterName: upper.name,
                url: url
            })
        });

        // Save the invite on the partup for further references
        var invite = {
            name: name,
            email: email
        }
        Partups.update(partupId, { $push: { 'invites': invite } });

        Event.emit('partups.invited', upper._id, partupId, email, name);

        return true;
    },

    /**
     * Search through Partups
     *
     * @param  {String} searchValue
     */
    'partups.search': function (searchValue) {
        check(searchValue, String);

        var upper = Meteor.user();
        if (! upper) throw new Meteor.Error(401, 'Unauthorized.');

        if (!searchValue) {
            return Partups.find({});
        }

        console.log('Searching for ', searchValue);

        return Partups.find(
            { $text: { $search: searchValue } },
            {
                /*
                 * `fields` is where we can add MongoDB projections. Here we're causing
                 * each document published to include a property named `score`, which
                 * contains the document's search rank, a numerical value, with more
                 * relevant documents having a higher score.
                 */
                fields: {
                    score: { $meta: 'textScore' }
                },
                /*
                 * This indicates that we wish the publication to be sorted by the
                 * `score` property specified in the projection fields above.
                 */
                sort: {
                    score: { $meta: 'textScore' }
                }
            }
        );
    }

});
