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

        Partups.update(partupId, {$addToSet: {'invites': invite}});

        Event.emit('partups.invited', user._id, partupId, email, name);

        return true;
    },

    /**
     * Discover partups based on provided filters
     *
     * @param {Object} options
     */
    'partups.discover': function(options) {
        var userId = Meteor.userId();

        var parameters = {
            networkId: options.networkId,
            locationId: options.locationId,
            sort: options.sort,
            textSearch: options.textSearch
        };

        return Partups.findForDiscover(userId, {}, parameters).map(function(partup) {
            return partup._id;
        });
    },

    /**
     * Return a list of partups based on search query
     *
     * @param {string} searchString
     */
    'partups.autocomplete': function(searchString, exceptPartupId) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            return Partups.find({
                $and: [
                    {name: new RegExp('.*' + searchString + '.*', 'i')},
                    {_id: {$ne: exceptPartupId}}
                ]
            }).fetch();
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partups_could_not_be_autocompleted');
        }
    }

});
