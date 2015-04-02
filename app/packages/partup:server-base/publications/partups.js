Meteor.publish('partups.all', function () {
    return Partups.find({});
});

Meteor.publish('partups.recent', function () {
    return Partups.find({}, { sort: { createdAt: -1 }, limit: 3 });
});

Meteor.publish('partups.supported', function () {
    return Partups.find({});
});

Meteor.publish('partups.one.activities', function (partupId) {
    return Activities.find({ partup_id: partupId });
});

Meteor.publish('partups.one.updates', function (partupId) {
    var subscription = this;
    var updatesHandle = null;
    var updatesUpperHandle = [];

    updatesHandle = Updates.find({ partup_id: partupId }).observeChanges({
        added: function(id, update) {
            var updatesUpperCursor = Meteor.users.find({ _id: update.upper_id }, { fields: { 'profile.name': 1 } });
            updatesUpperHandle[id] = Meteor.Collection._publishCursor(updatesUpperCursor, subscription, Meteor.users._name);

            subscription.added(Updates._name, id, update);
        },

        changed: function(id, fields) {
            subscription.changed(Updates._name, id, fields);
        },

        removed: function(id) {
            updatesUpperHandle[id] && updatesUpperHandle[id].stop();

            subscription.removed(Updates._name, id);
        }
    });

    subscription.ready();
    subscription.onStop(function() { updatesHandle.stop(); });
});

Meteor.publish('partups.one', function (partupId) {
    var subscription = this;
    var partupHandle = null;
    var uppersHandle = [];
    var supportersHandle = [];
    var imagesHandle = [];

    partupHandle = Partups.find({ _id: partupId }).observeChanges({
        added: function(id, partup) {
            // Publish all Uppers in a Partup
            var uppers = partup.uppers || [];
            var uppersCursor = Meteor.users.find({ _id: { $in: uppers }}, { fields: { 'profile.name': 1 } });
            uppersHandle[id] = Meteor.Collection._publishCursor(uppersCursor, subscription, Meteor.users._name);

            // Publish all Supporters in a Partup
            var supporters = partup.supporters || [];
            var supportersCursor = Meteor.users.find({ _id: { $in: supporters }}, { fields: { 'profile.name': 1 } });
            supportersHandle[id] = Meteor.Collection._publishCursor(supportersCursor, subscription, Meteor.users._name);

            // Publish the Cover in a Partup
            var imagesCursor = Images.find({ _id: partup.image });
            imagesHandle[id] = Meteor.Collection._publishCursor(imagesCursor, subscription, Images.files._name);

            subscription.added(Partups._name, id, partup);
        },

        changed: function(id, fields) {
            subscription.changed(Partups._name, id, fields);
        },

        removed: function(id) {
            uppersHandle[id] && uppersHandle[id].stop();
            supportersHandle[id] && supportersHandle[id].stop();
            activitiesHandle[id] && activitiesHandle[id].stop();
            imagesHandle[id] && imagesHandle[id].stop();
            updatesHandle[id] && updatesHandle.stop();

            subscription.removed(Partups._name, id);
        }
    });

    subscription.ready();
    subscription.onStop(function() { partupHandle.stop(); });
});
