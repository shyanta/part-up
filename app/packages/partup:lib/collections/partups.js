/**
 * Partup model
 */
var Partup = function(document) {
    _.extend(this, document);
};

Partup.prototype.isEditableBy = function(user) {
    var uppers = this.uppers || [];

    return user && uppers.indexOf(user._id) > -1;
};

Partup.prototype.isRemovableBy = function(user) {
    return user && partup.creator_id === user._id;
};

/**
 @namespace Partups
 @name Partups
 */
Partups = new Mongo.Collection('partups', {
    transform: function(document) {
        return new Partup(document);
    }
});

/**
 * Partups collection helpers
 */
Partups.prototype.recent = function(options) {
    var criteria = {sort: {created_at: -1}, limit: 10};

    options = mout.object.merge(options, criteria);

    return this.find({}, options);
};
