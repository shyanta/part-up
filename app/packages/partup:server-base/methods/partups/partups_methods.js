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

            Meteor.users.update(upper._id, { $pull: { 'partups': partupId } });
            Meteor.users.update({ _id: { $in: partup.supporters } }, { $pull: { 'supporterOf': partupId } }, { multi: true });

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

        var invite = {
            name: name,
            email: email
        }

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUser.html'));

        Email.send({
            to: email,
            subject: '@Invitation to Partup',
            html: SSR.render('inviteUserEmail', { name: name })
        });

        // Save the invite on the partup for further references
        Partups.update(partupId, { $push: { 'invites': invite } });

        Event.emit('partups.invited', upper._id, partupId, email, name);

        return true;
    }

});
