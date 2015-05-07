/**
 @namespace Partup updates factory
 @name Partup.factories.location
 @memberOf partup.factories
 */
Partup.factories.updatesFactory = {

    /**
     * Make a new update
     *
     * @param  {int} userId
     * @param  {int} partupId
     * @param  {string} type
     * @param  {mixed} typeData
     *
     * @return {Update}
     */
    make: function(userId, partupId, type, typeData) {
        var update = { };

        if (! userId) throw new Meteor.Error(500, 'Required argument [userId] is missing for method [Partup.factories.updatesFactory::make]');
        if (! partupId) throw new Meteor.Error(500, 'Required argument [partupId] is missing for method [Partup.factories.updatesFactory::make]');
        if (! type) throw new Meteor.Error(500, 'Required argument [type] is missing for method [Partup.factories.updatesFactory::make]');
        if (! typeData) throw new Meteor.Error(500, 'Required argument [typeData] is missing for method [Partup.factories.updatesFactory::make]');

        update.upper_id = userId;
        update.partup_id = partupId;
        update.type = type;
        update.type_data = typeData;
        update.created_at = new Date();
        update.updated_at = new Date();

        return update;
    }

};
