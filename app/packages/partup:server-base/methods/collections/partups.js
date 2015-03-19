Meteor.methods({

    'collections.partups.insert': function (fields) {
        // TODO AUTHORIZATION
        check(fields, Partup.schemas.partup);

        Partups.insert(fields, function (error, id) {
            if (error) throw new Meteor.Error(400, 'Partup could not be inserted.');

            var partup = Partups.findOne(id);

            Event.emitCollectionInsert(Partups, partup);
        });
    },

    'collections.partups.update': function (partupId, fields) {
        // TODO: Authorisation & Validation

        var partup = Partups.findOne(partupId);

        if (! partup) throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');

        Partups.update(partupId, { $set: fields }, function (error) {
            if (error) throw new Meteor.Error(400, 'Partup could not be updated.');

            Event.emitCollectionUpdate(Partups, partup, fields);
        });
    },

    'collections.partups.remove': function (partupId) {
        // TODO: Authorisation

        var partup = Partups.findOne(partupId);

        if (! partup) throw new Meteor.Error(404, 'Partup [' + partupId + '] was not found.');

        Partups.remove(partupId, function (error) {
            if (error) throw new Meteor.Error(400, 'Partup could not be removed.');

            Event.emitCollectionRemove(Partups, partup);
        });
    }

});
