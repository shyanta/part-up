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
 * Check if given user is a supporter of this partup
 *
 * @param {String} partupId
 * @return {Boolean}
 */
Partup.prototype.hasSupporter = function(userId) {
    return mout.lang.isString(userId) && this.supporters.indexOf(userId) > -1;
};

/**
 * Check if given user is an upper in this partup
 *
 * @param {String} partupId
 * @return {Boolen}
 */
Partup.prototype.hasUpper = function(userId) {
    return mout.lang.isString(userId) && this.uppers.indexOf(userId) > -1;
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
Partups.recent = function(options) {
    var criteria = {sort: {created_at: -1}, limit: 10};

    options = mout.object.merge(options, criteria);

    return this.find({}, options);
};
