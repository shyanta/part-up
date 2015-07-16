Meteor.methods({

    /**
     * Insert a Network
     *
     * @param {mixed[]} fields
     */
    'networks.insert': function(fields) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        // TODO: Either remove this method or implement proper authentication

        try {
            var network = {};
            network.name = fields.name;
            network.slug = Partup.server.services.slugify.slugify(fields.name);
            network.uppers = [user._id];
            network.admin_id = user._id;
            network.created_at = new Date();
            network.updated_at = new Date();

            network._id = Networks.insert(network);
            Meteor.users.update(user._id, {$push: {networks: network._id}});

            return {
                _id: network._id
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
            throw new Meteor.Error(401, 'unauthorized');
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
            throw new Meteor.Error(401, 'unauthorized');
        }

        if (network.hasMember(upperId)) {
            throw new Meteor.Error(409, 'User is already member of this network.');
        }

        // Check if already invited
        if (network.isUpperInvited(upperId)) {
            throw new Meteor.Error(409, 'Upper already invited.');
        }

        // Create the invite
        network.createInvite(upperId, user._id);

        Event.emit('networks.invited', user, networkId, upperId);

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
            throw new Meteor.Error(401, 'unauthorized');
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
     * Reject a request to join network
     *
     * @param {string} networkId
     * @param {string} upperId
     */
    'networks.reject': function(networkId, upperId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            network.rejectPendingUpper(upperId);

            return {
                network_id: network._id,
                upper_id: upperId
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'User [' + upperId + '] could not be rejected for network ' + networkId + '.');
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
            network.leave(user._id);

            return {
                network_id: network._id,
                upper_id: user._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'User [' + user._id + '] could not be removed from network ' + networkId + '.');
        }
    },

    /**
     * Remove an upper from a network as admin
     *
     * @param {string} networkId
     * @param {string} upperId
     */
    'networks.remove_upper': function(networkId, upperId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            network.leave(upperId);

            return {
                network_id: network._id,
                upper_id: upperId
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'User [' + upperId + '] could not be removed from network ' + networkId + '.');
        }
    },

    /**
     * Return a list of networks based on search query
     *
     * @param {string} searchString
     */
    'networks.autocomplete': function(searchString) {
        this.unblock();

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        if (!searchString) throw new Meteor.Error(400, 'searchString parameter is required');

        try {
            return Networks.find({name: new RegExp('.*' + searchString + '.*', 'i')}, {fields: {name: 1}}).fetch();
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Error while autocompleting network string: ' + searchString);
        }
    },

    /**
     * Get user suggestions for a given network
     *
     * @param {String} activityId
     *
     * @return {[String]}
     */
    'networks.user_suggestions': function(activityId) {
        var upper = Meteor.user();

        if (!upper) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        var users = Meteor.users.find().fetch();

        return users.map(function(user) {
            return user._id;
        });
    }
});
