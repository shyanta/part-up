/**
 * Partup model
 */
Partup = function(document) {
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
