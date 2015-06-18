Meteor.methods({
    /**
     * Insert a Partup
     *
     * @param {mixed[]} fields
     * @param {mixed[]} extraFields
     */
    'partups.insert': function(fields, extraFields) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'Unauthorized.');

        check(fields, Partup.schemas.forms.startPartup);

        try {
            var newPartup = Partup.transformers.partup.fromFormStartPartup(fields);
            newPartup.uppers = [user._id];
            newPartup.creator_id = user._id;
            newPartup.created_at = new Date();

            if (fields.privacy_type === 'public') {
                newPartup.privacy_type = Partup.PUBLIC;
            } else if (fields.privacy_type === 'private') {
                newPartup.privacy_type = Partup.PRIVATE;
            } else if (fields.privacy_type) {
                var network = Networks.findOneOrFail(fields.privacy_type);
                switch (network.privacy_type) {
                    case Networks.NETWORK_PUBLIC:
                        newPartup.privacy_type = Partup.NETWORK_PUBLIC;
                        break;
                    case Networks.NETWORK_INVITE:
                        newPartup.privacy_type = Partup.NETWORK_INVITE;
                        break;
                    case Networks.NETWORK_CLOSED:
                        newPartup.privacy_type = Partup.NETWORK_CLOSED;
                        break;
                }
            }

            //check(newPartup, Partup.schemas.entities.partup);

            newPartup._id = Partups.insert(newPartup);
            Meteor.users.update(user._id, {$push: {'partups': newPartup._id}});
            Meteor.users.update(user._id, {$push: {'upperOf': newPartup._id}});

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
     * @param {string} partupId
     * @param {mixed[]} fields
     * @param {mixed[]} extraFields
     */
    'partups.update': function(partupId, fields, extraFields) {

        check(fields, Partup.schemas.forms.startPartup);

        var user = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);
        var uppers = partup.uppers || [];

        if (!partup.isEditableBy(user)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var newPartupFields = Partup.transformers.partup.fromFormStartPartup(fields);

            Partups.update(partupId, {$set: newPartupFields});

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
    'partups.remove': function(partupId) {
        var user = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (!partup.isRemovableBy(user)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var supporters = partup.supporters || [];
            var uppers = partup.uppers || [];
            Meteor.users.update({_id: {$in: supporters}}, {$pull: {'supporterOf': partupId}}, {multi: true});
            Meteor.users.update({_id: {$in: uppers}}, {$pull: {'upperOf': partupId}}, {multi: true});

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
     * @param  {String} email
     * @param  {String} name
     */
    'partups.invite': function(partupId, email, name) {
        var user = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        if (!user) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        var invites = partup.invites || [];
        var invitedEmails = mout.array.pluck(invites, 'email');

        if (invitedEmails.indexOf(email) > -1) {
            throw new Meteor.Error(403, 'Email is already invited to the given partup.');
        }

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUser.html'));
        var url = Meteor.absoluteUrl() + 'partups/' + partup._id;

        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: email,
            subject: 'Uitnodiging voor Part-up ' + partup.name,
            html: SSR.render('inviteUserEmail', {
                name: name,
                partupName: partup.name,
                partupDescription: partup.description,
                inviterName: user.name,
                url: url
            })
        });

        // Save the invite on the partup for further references
        var invite = {
            name: name,
            email: email
        };

        Partups.update(partupId, {$push: {'invites': invite}});

        Event.emit('partups.invited', user._id, partupId, email, name);

        return true;
    }
});
