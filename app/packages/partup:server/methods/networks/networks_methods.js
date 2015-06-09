Meteor.methods({
    /**
     * Insert a Network
     *
     * @param {mixed[]} fields
     * @param {mixed[]} extraFields
     */
    'networks.insert': function(fields, extraFields) {
        check(fields, Partup.schemas.forms.network);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            var newNetwork = Network.transformers.network.fromFormNetwork(fields);
            newNetwork.uppers = [user._id];
            newNetwork.admin_id = user._id;
            newNetwork.created_at = new Date();

            //check(newNetwork, Network.schemas.entities.network);

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
     * @param {mixed[]} extraFields
     */
    'networks.update': function(networkId, fields, extraFields) {
        check(fields, Network.schemas.forms.network);

        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var newNetworkFields = Network.transformers.network.fromFormNetwork(fields);

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
     * Remove a Network
     *
     * @param {string} networkId
     */
    'networks.remove': function(networkId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            //

            return {
                _id: network._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Network [' + networkId + '] could not be removed.');
        }
    },

    /**
     * Invite someone to a Network
     *
     * @param  {String} networkId
     * @param  {String} email
     * @param  {String} name
     */
    'networks.invite': function(networkId, email, name) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!user) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        var invites = network.invites || [];
        var invitedEmails = mout.array.pluck(invites, 'email');

        if (invitedEmails.indexOf(email) > -1) {
            throw new Meteor.Error(403, 'Email is already invited to the given network.');
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
            _id: name,
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

        if (!network.hasMember(user._id)) {
            throw new Meteor.Error(409, 'User is already member of this network.');
        }

        try {
            // Add user to pending if it's a closed network
            if (network.access_level === PRIVATE_CLOSED) {
                if (!network.pending_uppers.indexOf(user._id) > -1) {
                    Networks.update(networkId, {$push: {pending_uppers: user._id}});
                }
            }

            //
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Network [' + networkId + '] could not be removed.');
        }
    },

    /**
     * Accept a request to join network
     *
     * @param {string} networkId
     */
    'networks.accept': function(networkId, upperId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            //

            return {
                _id: network._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Network [' + networkId + '] could not be removed.');
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

        try {
            //

            return {
                _id: network._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Network [' + networkId + '] could not be removed.');
        }
    }
});
