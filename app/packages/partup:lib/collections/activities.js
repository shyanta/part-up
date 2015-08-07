/**
 * @ignore
 */
var Activity = function(document) {
    _.extend(this, document);
};

/**
 * Check if the activity is open
 *
 * @memberof Activities
 * @return {Boolean}
 */
Activity.prototype.isOpen = function() {
    return Contributions.findForActivity(this).count() === 0;
};

/**
 * Check if the activity is closed
 *
 * @memberof Activities
 * @return {Boolean}
 */
Activity.prototype.isClosed = function() {
    return Contributions.findForActivity(this).count() > 0;
};

/**
 * Check if upper is already invited to the activity
 *
 * @memberof Activities
 * @param {String} upperId the user id of the user to be checked
 * @return {Boolean}
 */
Activity.prototype.isUpperInvited = function(upperId) {
    return !!Invites.findOne({activity_id: this._id, invitee_id: upperId, type: Invites.INVITE_TYPE_ACTIVITY_EXISTING_UPPER});
};

/**
 * Remove all invites for a specific user for this activity
 *
 * @memberof Activities
 * @param {String} upperId id of the user whose invites have to be removed
 */
Activity.prototype.removeAllUpperInvites = function(upperId) {
    Invites.remove({activity_id: this._id, invitee_id: upperId});
};

/**
 * Soft delete an activity
 *
 * @memberOf Activities
 */
Activity.prototype.remove = function() {
    Partups.update(this.partup_id, {$inc: {activity_count: -1}});

    Activities.update(this._id, {$set:{deleted_at: new Date}});
};

/**
 * Check whether or not an activity is removed
 *
 * @memberOf Activities
 * @return {Boolean}
 */
Activity.prototype.isRemoved = function() {
    return !!this.deleted_at;
};

/**
 * Activities are units of work that a partup consists of
 *
 * @namespace Activities
 * @memberOf Collection
 */
Activities = new Mongo.Collection('activities', {
    transform: function(document) {
        return new Activity(document);
    }
});

// Add indices
if (Meteor.isServer) {
    Activities._ensureIndex('creator_id');
    Activities._ensureIndex('partup_id');
    Activities._ensureIndex('update_id');
}

/**
 * Find activity for an update
 *
 * @memberOf Activities
 * @param {Update} update
 * @return {Mongo.Cursor|Void}
 */
Activities.findForUpdate = function(update) {
    if (!update.isActivityUpdate()) return;

    return Activities.find({_id: update.type_data.activity_id}, {limit: 1});
};

/**
 * Find activity for contribution
 *
 * @memberOf Activities
 * @param {Contribution} contribution
 * @return {Mongo.Cursor}
 */
Activities.findForContribution = function(contribution) {
    return Activities.find({_id: contribution.activity_id}, {limit: 1});
};

/**
 * Find activities for partup
 *
 * @memberOf Activities
 * @param {Contribution} contribution
 * @return {Mongo.Cursor}
 */
Activities.findForPartup = function(partup, options, parameters) {
    options = options || {};
    parameters = parameters || {};

    var selector = {
        partup_id: partup._id
    };

    if (parameters.hasOwnProperty('archived')) {
        selector.archived = !!parameters.archived;
    }

    return Activities.find(selector, options);
};
