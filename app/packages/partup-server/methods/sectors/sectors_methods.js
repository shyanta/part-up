Meteor.methods({
    /**
     * Insert a new sector
     *
     * @param {string} fields
     */
    'sectors.insert': function(fields) {
        check(fields, Partup.schemas.forms.sector);

        this.unblock();

        // Check if user is admin
        var user = Meteor.user();
        if (!User(user).isAdmin()) throw new Meteor.Error(401, 'unauthorized');

        try {
            if (!Sectors.findOne({name: fields.name})) {
                Sectors.insert({name: fields.name, phrase_key: fields.phrase_key});
            } else {
                throw new Meteor.Error('sector_already_exists');
            }

            return true;
        } catch (error) {
            Log.error(error);
            if (error.message == '[sector_already_exists]') throw new Meteor.Error(400, 'sector_already_exists');
            throw new Meteor.Error(400, 'sector_could_not_be_inserted');
        }
    },

    /**
     * Update an existing sector
     * 
     * @param {string} sectorId
     * @param {mixed[]} fields
     */
    'sectors.update': function (sectorId, fields) {
        check(sectorId, String)
        check(fields, Partup.schemas.forms.sector)

        var user = Meteor.user()
        if (!user) throw new Meteor.Error(401, 'unauthorized')
        if (!User(user).isAdmin()) throw new Meteor.Error(401, 'unauthorized')

        var sector = Sectors.findOneOrFail({_id: sectorId})
        try {
            Sectors.update(sector._id, {$set: fields})
        } catch (error) {
            Log.error(error)
            throw new Meteor.Error(400, 'sector_could_not_be_updated')
        }
    },

    /**
     * Remove a sector
     *
     * @param {String} sectorId
     */
    'sectors.remove': function(sectorId) {
        check(sectorId, String);

        var user = Meteor.user();
        if (!User(user).isAdmin()) throw new Meteor.Error(401, 'unauthorized');

        try {
            Networks.update({sector_id: sectorId}, {$unset: {'sector_id': ''}});
            Sectors.remove({_id: sectorId});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'sector_could_not_be_removed');
        }
    }
});
