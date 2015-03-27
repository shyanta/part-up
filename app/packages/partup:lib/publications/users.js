Meteor.publish('users.count', function() {
    Counts.publish(this, 'users', Meteor.users.find());
});

Meteor.publish('users.loggedin', function () {
    var subscription = this;
    var userHandle = null;
    var imagesHandle = [];

    userHandle = Meteor.users.find({ _id: this.userId }).observeChanges({
        added: function(id, user) {
            var profile = user.profile || {};

            // Publish the Avatar in a User
            var imagesCursor = Images.find({ _id: profile.image });
            imagesHandle[id] = Meteor.Collection._publishCursor(imagesCursor, subscription, Images.files._name);

            subscription.added('users', id, user);
        },

        changed: function(id, fields) {
            subscription.changed('users', id, fields);
        },

        removed: function(id) {
            imagesHandle[id] && imagesHandle[id].stop();
            subscription.removed('users', id);
        }
    });

    subscription.ready();
    subscription.onStop(function() { userHandle.stop(); });
});
