Meteor.methods({
    /**
     * Insert a Network
     *
     * @param {mixed[]} fields
     */
    'networks.insert': function(fields) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'Unauthorized.');

        check(fields, Partup.schemas.forms.network);

        try {
            var newNetwork = Partup.transformers.network.fromFormNetwork(fields);
            newNetwork._id = Random.id();
            newNetwork.uppers = [user._id];
            newNetwork.admin_id = user._id;
            newNetwork.created_at = new Date();
            newNetwork.updated_at = new Date();

            check(newNetwork, Partup.schemas.entities.network);

            Networks.insert(newNetwork);
            Meteor.users.update(user._id, {$push: {networks: newNetwork._id}});

            return {
                _id: newNetwork._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Network could not be inserted.');
        }
    },

    /**
     * Update a Network
     *
     * @param {string} networkId
     * @param {mixed[]} fields
     */
    'networks.update': function(networkId, fields) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        check(fields, Partup.schemas.forms.network);

        try {
            var newNetworkFields = Partup.transformers.network.fromFormNetwork(fields);

            Networks.update(networkId, {$set: newNetworkFields});

            return {
                _id: network._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Network [' + networkId + '] could not be updated.');
        }
    },

    /**
     * Invite an Upper to a Network
     *
     * @param  {String} networkId
     * @param  {String} upperId
     */
    'networks.invite': function(networkId, upperId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        // Only members of a network can invite other users
        if (!user || !network.hasMember(user._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        if (network.hasMember(upperId)) {
            throw new Meteor.Error(409, 'User is already member of this network.');
        }

        // Check if already invited
        if (network.isUpperInvited(upperId)) {
            throw new Meteor.Error(409, 'Upper already invited.');
        }

        // Save the invite on the network for further references
        var invite = {
            _id: upperId,
            invited_at: new Date(),
            invited_by_id: user._id
        };

        Networks.update(networkId, {$push: {invites: invite}});

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUserToNetwork.html'));
        var url = Meteor.absoluteUrl() + 'networks/' + network._id;
        var upper = Meteor.users.findSinglePrivateProfile(upperId).fetch()[0];
        var upperEmail = upper.emails[0].address;

        if (upperEmail) {
            Email.send({
                from: 'Part-up <noreply@part-up.com>',
                to: upperEmail,
                subject: 'Uitnodiging voor Part-up netwerk ' + network.name,
                html: SSR.render('inviteUserEmail', {
                    name: upper.profile.name,
                    networkName: network.name,
                    networkDescription: network.description,
                    inviterName: user.name,
                    url: url
                })
            });
        }

        Event.emit('networks.invited', user._id, networkId, upperId);

        return true;
    },

    /**
     * Invite someone to a Network by email
     *
     * @param  {String} networkId
     * @param  {String} email
     * @param  {String} name
     */
    'networks.email_invite': function(networkId, email, name) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!user) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        var invites = network.invites || [];
        var invitedEmails = mout.array.pluck(invites, 'email');

        if (invitedEmails.indexOf(email) > -1) {
            throw new Meteor.Error(403, 'Email address is already invited to the given network.');
        }

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUserToNetwork.html'));
        var url = Meteor.absoluteUrl() + 'networks/' + network._id;

        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: email,
            subject: 'Uitnodiging voor Part-up netwerk ' + network.name,
            html: SSR.render('inviteUserEmail', {
                name: name,
                networkName: network.name,
                networkDescription: network.description,
                inviterName: user.name,
                url: url
            })
        });

        // Save the invite on the network for further references
        var invite = {
            name: name,
            email: email
        };

        Networks.update(networkId, {$push: {invites: invite}});

        Event.emit('networks.invited', user._id, networkId, email, name);

        return true;
    },

    /**
     * Join a Network
     *
     * @param {string} networkId
     */
    'networks.join': function(networkId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (network.hasMember(user._id)) {
            throw new Meteor.Error(409, 'User is already member of this network.');
        }

        try {
            if (network.isClosed()) {
                // Add user to pending if it's a closed network
                if (network.addPendingUpper(user._id)) {
                    return Log.debug('User added to waiting list');
                } else {
                    return Log.debug('User is already added to waiting list');
                }
            }

            if (network.isInvitational()) {
                // Check if the user is invited
                var invite = network.isUpperInvited(user._id);

                if (invite) {
                    network.addInvitedUpper(user._id, invite);
                    return Log.debug('User added to invitational network.');
                } else {
                    if (network.addPendingUpper(user._id)) {
                        return Log.debug('This network is for invited members only. Added user to pending list.');
                    } else {
                        return Log.debug('User is already added to pending list.');
                    }
                }
            }

            if (network.isPublic()) {
                // Allow user instantly
                network.addUpper(user._id);
                return Log.debug('User added to network.');
            }

            return Log.debug('Unknown access level for this network: ' + network.privacy_type);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Network [' + networkId + '] could not be removed.');
        }
    },

    /**
     * Accept a request to join network
     *
     * @param {string} networkId
     * @param {string} upperId
     */
    'networks.accept': function(networkId, upperId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        if (network.hasMember(upperId)) {
            throw new Meteor.Error(409, 'User is already member of this network.');
        }

        try {
            network.acceptPendingUpper(upperId);

            Event.emit('networks.accepted', user._id, networkId, upperId);

            return {
                network_id: network._id,
                upper_id: upperId
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'User [' + upperId + '] could not be accepted for network ' + networkId + '.');
        }
    },

    /**
     * Leave a Network
     *
     * @param {string} networkId
     */
    'networks.leave': function(networkId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.hasMember(user._id)) {
            throw new Meteor.Error(400, 'User is not a member of this network.');
        }

        try {
            // @TODO Also remove from all Partups including ones with contributions?
            network.leave(user._id);

            return {
                network_id: network._id,
                upper_id: user._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'User [' + user._id + '] could not be removed from network ' + networkId + '.');
        }
    }
});
