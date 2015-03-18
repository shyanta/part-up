Meteor.methods({

    'collections.partups.insert': function (fields) {
        // TODO AUTHORIZATION
        check(fields, Partup.schemas.partup);

        Event.emitCollectionInsert(Partups, fields);
    },

    'collections.partups.update': function (partupId, fields) {
        // TODO: Authorisation & Validation

        var partup = Partups.findOne(partupId);

        if (! partup) return;

        Event.emitCollectionUpdate(Partups, partup, fields);
    },

    'collections.partups.remove': function (partupId) {
        // TODO: Authorisation

        var partup = Partups.findOne(partupId);

        if (! partup) return;

        Event.emitCollectionRemove(Partups, partup);
    }

});