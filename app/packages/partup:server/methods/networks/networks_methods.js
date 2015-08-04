Meteor.methods({

    /**
     * Insert a Network
     *
     * @param {mixed[]} fields
     */
    'networks.insert': function(fields) {
        var user = Meteor.user();
        if (!user || !User(user).isAdmin()) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        check(fields, Partup.schemas.forms.networkCreate);

        try {
            var network = {};
            network.name = fields.name;
            network.privacy_type = fields.privacy_type;
            network.slug = Partup.server.services.slugify.slugify(fields.name);
            network.uppers = [user._id];
            network.admin_id = user._id;
            network.created_at = new Date();
            network.updated_at = new Date();

            network._id = Networks.insert(network);
            Meteor.users.update(user._id, {$addToSet: {networks: network._id}});

            return {
                _id: network._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'network_could_not_be_inserted');
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

        if (!user || !network.isAdmin(user._id)) {
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
            throw new Meteor.Error(400, 'network_could_not_be_updated');
        }
    },

    /**
     * Invite someone to a network
     *
     * @param {String} networkId
     * @param {String} email
     * @param {String} name
     */
    'networks.invite_by_email': function(networkId, email, name) {
        var inviter = Meteor.user();

        if (!inviter) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        var network = Networks.findOneOrFail(networkId);

        var isAllowedToAccessPartup = !!Partups.guardedFind(inviter._id, {_id: network.partup_id}).count() > 0;
        if (!isAllowedToAccessPartup) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        var isAlreadyInvited = !!Invites.findOne({network_id: networkId, invitee_email: email, type: Invites.INVITE_TYPE_NETWORK_EMAIL});
        if (isAlreadyInvited) {
            throw new Meteor.Error(403, 'email_is_already_invited_to_network');
        }

        var locale = User(inviter).getLocale();

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserNetworkEmail', Assets.getText('private/emails/InviteUserToNetwork.' + locale + '.html'));
        var url = Meteor.absoluteUrl() + 'partups/' + partup._id;

        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: email,
            subject: 'Uitnodiging voor het netwerk ' + network.name,
            html: SSR.render('inviteUserNetworkEmail', {
                name: name,
                partupName: partup.name,
                partupDescription: partup.description,
                networkName: network.name,
                networkDescription: network.description,
                inviterName: inviter.profile.name,
                url: url
            })
        });

        var invite = {
            type: Invites.INVITE_TYPE_NETWORK_EMAIL,
            network_id: network._id,
            inviter_id: inviter._id,
            invitee_name: name,
            invitee_email: email,
            created_at: new Date
        };

        Invites.insert(invite);
    },

    /**
     * Invite an existing upper to an network
     *
     * @param {String} networkId
     * @param {String} inviteeId
     */
    'networks.invite_existing_upper': function(networkId, inviteeId) {
        var inviter = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!inviter || !network.hasMember(inviter._id)) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        if (network.hasMember(inviteeId)) {
            throw new Meteor.Error(409, 'user_is_already_member_of_network');
        }

        var invitee = Meteor.users.findOneOrFail(inviteeId);
        var isAlreadyInvited = !!Invites.findOne({network_id: networkId, invitee_id: invitee._id, inviter_id: inviter._id, type: Invites.INVITE_TYPE_NETWORK_EXISTING_UPPER});
        if (isAlreadyInvited) {
            throw new Meteor.Error(403, 'user_is_already_invited_to_network');
        }

        var notificationOptions = {
            userId: invitee._id,
            type: 'partups_networks_invited',
            typeData: {
                inviter: {
                    _id: inviter._id,
                    name: inviter.profile.name,
                    image: inviter.profile.image
                },
                network: {
                    _id: networkId,
                    name: network.name,
                    image: network.image,
                    slug: network.slug
                }
            }
        };

        Partup.server.services.notifications.send(notificationOptions);

        // Compile the E-mail template and send the email
        var locale = User(inviter).getLocale();
        SSR.compileTemplate('inviteExistingUserNetwork', Assets.getText('private/emails/InviteUserToNetwork.' + locale + '.html'));
        var url = Meteor.absoluteUrl() + network.slug;
        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: User(invitee).getEmail(),
            subject: 'Part-up invite ' + network.name,
            html: SSR.render('inviteExistingUserNetwork', {
                name: invitee.profile.name,
                networkName: network.name,
                networkDescription: network.description,
                inviterName: inviter.name,
                url: url
            })
        });

        // Store invite
        var invite = {
            type: Invites.INVITE_TYPE_NETWORK_EXISTING_UPPER,
            network_id: network._id,
            inviter_id: inviter._id,
            invitee_id: invitee._id,
            created_at: new Date
        };

        Invites.insert(invite);
    },

    /**
     * Join a Network
     *
     * @param {string} networkId
     */
    'networks.join': function(networkId) {
        var user = Meteor.user();
        var network = Networks.findOneOrFail(networkId);

        if (!user) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        if (network.hasMember(user._id)) {
            throw new Meteor.Error(409, 'user_is_already_member_of_network');
        }

        try {
            if (network.isClosed()) {
                // Add user to pending if it's a closed network and the user is invited
                if (network.isUpperInvited(user._id)) {
                    network.addPendingUpper(user._id);

                    // Send notification to network admin
                    var notificationOptions = {
                        userId: network.admin_id,
                        type: 'partups_networks_new_pending_upper',
                        typeData: {
                            pending_upper: {
                                _id: user._id,
                                name: user.profile.name,
                                image: user.profile.image
                            },
                            network: {
                                _id: network._id,
                                name: network.name,
                                image: network.image,
                                slug: network.slug
                            }
                        }
                    };

                    Partup.server.services.notifications.send(notificationOptions);

                    return Log.debug('User (already) added to waiting list');
                } else {
                    throw new Meteor.Error(401, 'unauthorized');
                }
            }

            if (network.isInvitational()) {
                // Check if the user is invited
                var invite = network.isUpperInvited(user._id);

                if (invite) {
                    network.addInvitedUpper(user._id);
                    network.removeAllUpperInvites(user._id);

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
                network.removeAllUpperInvites(user._id);
                return Log.debug('User added to network.');
            }

            return Log.debug('Unknown access level for this network: ' + network.privacy_type);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'network_could_not_be_removed');
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
            throw new Meteor.Error(409, 'user_is_already_member_of_network');
        }

        try {
            network.acceptPendingUpper(upperId);
            network.removeAllUpperInvites(upperId);

            Event.emit('networks.accepted', user._id, networkId, upperId);

            return {
                network_id: network._id,
                upper_id: upperId
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'user_could_not_be_accepted_from_network');
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
            throw new Meteor.Error(400, 'user_could_not_be_rejected_from_network');
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
            throw new Meteor.Error(400, 'user_is_not_a_member_of_network');
        }

        if (network.isAdmin(user._id)) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            network.leave(user._id);

            return {
                network_id: network._id,
                upper_id: user._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'user_could_not_be_removed_from_network');
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

        if (!network.isAdmin(user._id) || network.isAdmin(upperId)) {
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
            throw new Meteor.Error(400, 'user_could_not_be_removed_from_network');
        }
    },

    /**
     * Return a list of networks based on search query
     *
     * @param {string} query
     */
    'networks.autocomplete': function(query) {
        this.unblock();

        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            return Networks.guardedMetaFind({name: new RegExp('.*' + query + '.*', 'i')}).fetch();
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'networks_could_not_be_autocompleted');
        }
    },

    /**
     * Get user suggestions for a given network
     *
     * @param {String} networkId
     * @param {Object} options
     * @param {Number} options.locationId
     * @param {String} options.query
     *
     * @return {[String]}
     */
    'networks.user_suggestions': function(networkId, options) {
        this.unblock();

        var upper = Meteor.user();

        if (!upper) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        var users = Partup.server.services.matching.matchUppersForNetwork(networkId, options);

        // We are returning an array of IDs instead of an object
        return users.map(function(user) {
            return user._id;
        });
    }
});
