Meteor.methods({
    /**
     * Insert a Network
     *
     * @param {mixed[]} fields
     */
    'networks.insert': function(fields) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            var newNetwork = Network.transformers.network.fromFormNetwork(fields);
            check(fields, Partup.schemas.forms.network);
            newNetwork.uppers = [user._id];
            newNetwork.admin_id = user._id;
            newNetwork.created_at = new Date();
            newNetwork.updated_at = new Date();
            check(newNetwork, Network.schemas.entities.network);

            newNetwork._id = Networks.insert(newNetwork);
            Meteor.users.update(user._id, {$push: {'networks': newNetwork._id}});

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

        try {
            var newNetworkFields = Network.transformers.network.fromFormNetwork(fields);
            check(fields, Network.schemas.forms.network);

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
        SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUser.html'));
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

        Networks.update(networkId, {$push: {'invites': invite}});

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
                if (!network.pending_uppers.indexOf(user._id) > -1) {
                    Networks.update(networkId, {$push: {pending_uppers: user._id}});
                    return Log.debug('User added to waiting list');
                }
            }

            if (network.isInvitational()) {
                //throw new Meteor.Error(403, 'This network is for invited members only.');
                return Log.debug('This network is for invited members only.');
            }

            if (network.isPublic()) {
                // Allow user instantly
                Networks.update(networkId, {$push: {uppers: user._id}});
                Meteor.users.update(user._id, {$push: {'networks': network._id}});
                return Log.debug('User added to network.');
            }

            return Log.debug('Unknown access level for this network: ' + network.access_level);
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
            Networks.update(networkId, {$push: {uppers: upperId}});
            Meteor.users.update(upperId, {$push: {'networks': network._id}});

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
            // Also remove from all Partups including ones with contributions?
            Networks.update(networkId, {$pull: {uppers: user._id}});
            Meteor.users.update(user._id, {$pull: {'networks': network._id}});

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
