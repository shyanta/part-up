Meteor.methods({
    /**
     * Insert a Partup
     *
     * @param {mixed[]} fields
     */
    'partups.insert': function(fields) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        check(fields, Partup.schemas.forms.partupCreate);

        try {
            var newPartup = Partup.transformers.partup.fromFormStartPartup(fields);
            newPartup.uppers = [user._id];
            newPartup.creator_id = user._id;
            newPartup.created_at = new Date();

            //check(newPartup, Partup.schemas.entities.partup);

            newPartup._id = Partups.insert(newPartup);
            Meteor.users.update(user._id, {$addToSet: {'upperOf': newPartup._id}});

            // Generate the slug for the Partup
            var slug = Partup.server.services.slugify.slugifyDocument(newPartup, 'name');
            Partups.update(newPartup._id, {$set: {'slug': slug}});

            return {
                _id: newPartup._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partup_could_not_be_inserted');
        }
    },

    /**
     * Update a Partup
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'partups.update': function(partupId, fields) {
        var user = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        check(fields, Partup.schemas.forms.partupUpdate);

        var uppers = partup.uppers || [];

        if (!partup.isEditableBy(user)) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            var newPartupFields = Partup.transformers.partup.fromFormStartPartup(fields);

            // update the slug when the name has changed
            if (fields.name) {
                var document = {
                    _id: partup._id,
                    name: newPartupFields.name
                };
                newPartupFields.slug = Partup.server.services.slugify.slugifyDocument(document, 'name');
            }

            Partups.update(partupId, {$set: newPartupFields});

            return {
                _id: partup._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partup_could_not_be_updated');
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
            throw new Meteor.Error(401, 'unauthorized');
        }

        try {
            partup.remove();

            return {
                _id: partup._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partup_could_not_be_removed');
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
            throw new Meteor.Error(401, 'unauthorized');
        }

        var invites = partup.invites || [];
        var invitedEmails = mout.array.pluck(invites, 'email');

        if (invitedEmails.indexOf(email) > -1) {
            throw new Meteor.Error(403, 'email_is_already_invited_to_partup');
        }

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserEmail', Assets.getText('private/emails/InviteUser.html'));
        var url = Meteor.absoluteUrl() + 'partups/' + partup._id;

        Email.send({
            from: Partup.constants.EMAIL_FROM,
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

        Partups.update(partupId, {$addToSet: {'invites': invite}});

        Event.emit('partups.invited', user._id, partupId, email, name);

        return true;
    },

    /**
     * Discover partups based on provided filters
     *
     * @param {Object} parameters
     */
    'partups.discover': function(parameters) {
        var userId = Meteor.userId();

        var options = {};
        parameters = parameters || {};

        if (parameters.limit) options.limit = parseInt(parameters.limit);

        var parameters = {
            networkId: parameters.networkId,
            locationId: parameters.locationId,
            sort: parameters.sort,
            textSearch: parameters.textSearch,
            limit: parameters.limit
        };

        return Partups.findForDiscover(userId, options, parameters).map(function(partup) {
            return partup._id;
        });
    },

    /**
     * Return a list of partups based on search query
     *
     * @param {string} searchString
     * @param {string} exceptPartupId
     * @param {boolean} onlyPublic When this is true, only public partups will be returned
     */
    'partups.autocomplete': function(searchString, exceptPartupId, onlyPublic) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');
        onlyPublic = onlyPublic || false;

        var selector = [
            {name: new RegExp('.*' + searchString + '.*', 'i')},
            {_id: {$ne: exceptPartupId}}
        ];

        if (onlyPublic) {
            selector.push({'privacy_type': {'$in': [Partups.PUBLIC, Partups.NETWORK_PUBLIC]}});
        }

        try {
            return Partups.find({$and: selector}, {limit: 30}).fetch();
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partups_could_not_be_autocompleted');
        }
    },

    /**
     * Return a list of partups based on search query
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'partups.feature': function(partupId, fields) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');
        if (!User(user).isAdmin()) throw new Meteor.Error(401, 'unauthorized');

        try {
            if (fields.active) {
                featured = {
                    'active': true,
                    'by_upper': {
                        '_id': user._id,
                        'title': fields.job_title
                    },
                    'comment': fields.comment
                };

                Partups.update(partupId, {$set: {'featured': featured}});
            } else {
                Partups.update(partupId, {$unset: {'featured': ''}});
            }

            return true;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partups_could_not_be_featured');
        }
    },

    /**
    * Returns partup stats to superadmins only
    */
    'partups.admin_all': function() {
        var user = Meteor.users.findOne(this.userId);
        if (!User(user).isAdmin()) {
            return;
        }
        return Partups.findStatsForAdmin();
    },

    /**
     * Random featured partup
     */
    'partups.featured_one_random': function() {
        this.unblock();

        var count = Partups.guardedMetaFind({'featured.active': true}, {}).count();
        var random = Math.floor(Math.random() * count);

        var partup = Partups.guardedMetaFind({'featured.active': true}, {limit: 1, skip: random}).fetch().pop();

        if (!partup) throw new Meteor.Error(404, 'no_featured_partup_found');

        return partup._id;
    },

});
