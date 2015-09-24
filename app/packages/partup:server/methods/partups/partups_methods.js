var Cache = Partup.server.services.cache;

Meteor.methods({
    /**
     * Insert a Partup
     *
     * @param {mixed[]} fields
     */
    'partups.insert': function(fields) {
        check(fields, Partup.schemas.forms.partupCreate);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        try {
            var newPartup = Partup.transformers.partup.fromFormStartPartup(fields);
            newPartup._id = Random.id();
            newPartup.uppers = [user._id];
            newPartup.creator_id = user._id;
            newPartup.created_at = new Date();
            newPartup.slug = Partup.server.services.slugify.slugifyDocument(newPartup, 'name');

            //check(newPartup, Partup.schemas.entities.partup);

            Partups.insert(newPartup);
            Meteor.users.update(user._id, {$addToSet: {'upperOf': newPartup._id}});

            return {
                _id: newPartup._id,
                slug: newPartup.slug
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
        check(partupId, String);
        check(fields, Partup.schemas.forms.partupUpdate);

        var user = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

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
        check(partupId, String);

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
     * Discover partups based on provided filters
     *
     * @param {Object} parameters
     * @param {string} options.networkId
     * @param {string} options.locationId
     * @param {string} options.sort
     * @param {string} options.textSearch
     * @param {number} options.limit
     * @param {string} options.language
     */
    'partups.discover': function(parameters) {
        check(parameters, {
            networkId: Match.Optional(String),
            locationId: Match.Optional(String),
            sort: Match.Optional(String),
            textSearch: Match.Optional(String),
            limit: Match.Optional(Number),
            language: Match.Optional(String)
        });

        var userId = Meteor.userId();

        var cacheId = 'discover_partupids_' + JSON.stringify(parameters);
        if (!userId && Cache.has(cacheId)) {
            return Cache.get(cacheId) || [];
        }

        var options = {};
        parameters = parameters || {};

        if (parameters.limit) options.limit = parseInt(parameters.limit);

        parameters = {
            networkId: parameters.networkId,
            locationId: parameters.locationId,
            sort: parameters.sort,
            textSearch: parameters.textSearch,
            limit: parameters.limit,
            language: parameters.language
        };

        var partupIds = Partups.findForDiscover(userId, options, parameters).map(function(partup) {
            return partup._id;
        });

        if (!userId) Cache.set(cacheId, partupIds, 3600);

        return partupIds;
    },

    /**
     * Return a list of partups based on search query
     *
     * @param {string} searchString
     * @param {string} exceptPartupId
     * @param {boolean} onlyPublic When this is true, only public partups will be returned
     */
    'partups.autocomplete': function(searchString, exceptPartupId, onlyPublic) {
        check(searchString, String);
        check(exceptPartupId, Match.Optional(String));
        check(onlyPublic, Match.Optional(Boolean));

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');
        onlyPublic = onlyPublic || false;

        var selector = {};

        selector.name = new RegExp('.*' + searchString + '.*', 'i');
        selector._id = {$ne: exceptPartupId};

        if (onlyPublic) {
            selector.privacy_type = {'$in': [Partups.PUBLIC, Partups.NETWORK_PUBLIC]};
        }

        try {
            return Partups.guardedFind(Meteor.userId(), selector, {limit: 30}).fetch();
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partups_could_not_be_autocompleted');
        }
    },

    /**
     * Feature a specific partup (superadmin only)
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'partups.feature': function(partupId, fields) {
        check(partupId, String);
        check(fields, Partup.schemas.forms.featurePartup);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');
        if (!User(user).isAdmin()) throw new Meteor.Error(401, 'unauthorized');

        try {
            var author = Meteor.users.findOne(fields.author_id);
            featured = {
                'active': true,
                'by_upper': {
                    '_id': author._id,
                    'title': fields.job_title
                },
                'comment': fields.comment
            };

            Partups.update(partupId, {$set: {'featured': featured}});

        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partups_could_not_be_featured');
        }
    },

    /**
     * Unfeature a specific partup (superadmin only)
     *
     * @param {string} kId
     * @param {mixed[]} fields
     */
    'partups.unfeature': function(partupId) {
        check(partupId, String);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');
        if (!User(user).isAdmin()) throw new Meteor.Error(401, 'unauthorized');

        try {
            Partups.update(partupId, {$unset: {'featured': ''}});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partup_could_not_be_unfeatured');
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
    'partups.featured_one_random': function(language) {
        check(language, String);

        this.unblock();

        var selector = {'featured.active': true};
        if (language) {
            selector.language = language;
        }
        var count = Partups.guardedMetaFind(selector, {}).count();
        var random = Math.floor(Math.random() * count);

        var partup = Partups.guardedMetaFind(selector, {limit: 1, skip: random}).fetch().pop();

        if (!partup) throw new Meteor.Error(404, 'no_featured_partup_found');

        return partup._id;
    },

    /**
     * Consume an access token and add the user to the invites
     */
    'partups.convert_access_token_to_invite': function(partupId, accessToken) {
        check(partupId, String);
        check(accessToken, String);

        var user = Meteor.user();
        var partup = Partups.findOneOrFail(partupId);

        try {
            partup.convertAccessTokenToInvite(user._id, accessToken);
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partup_access_token_could_not_be_converted_to_invite');
        }
    },

    /**
     * Reset new updates count
     *
     * @param {String} partupId
     */
    'partups.reset_new_updates': function(partupId) {
        check(partupId, String);

        try {
            Partups.update({_id: partupId, 'upper_data._id': Meteor.userId()}, {$set: {'upper_data.$.new_updates': []}});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'partup_new_updates_could_not_be_reset');
        }
    }

});
