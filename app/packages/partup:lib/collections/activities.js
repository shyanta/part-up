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
Activities.findForPartup = function(partup_id, options, parameters) {
    options = options || {};
    parameters = parameters || {};

    var selector = {
        partup_id: partup_id
    };

    if (parameters.archived) selector.archived = true;

    return Activities.find(selector, options);
};
