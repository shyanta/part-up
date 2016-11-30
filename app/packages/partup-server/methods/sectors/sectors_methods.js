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
            if (!Sectors.findOne({_id: fields._id})) {
                Sectors.insert({_id: fields._id});
            }

            return true;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'sector_could_not_be_inserted');
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
            Networks.update({sector: sectorId}, {$unset: {'sector': ''}});
            Sectors.remove({_id: sectorId});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'sector_could_not_be_removed');
        }
    }
});
