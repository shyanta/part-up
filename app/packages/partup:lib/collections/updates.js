/**
 * Partup model
 * @ignore
 */
var Update = function(document) {
    _.extend(this, document);
};

/**
 * Check if given updates last comment is system message
 *
 * @return {Boolean}
 */
Update.prototype.lastCommentIsSystemMessage = function() {
    if (!this.comments) return false;
    if (this.comments.length < 1) return false;
    return !!mout.array.last(this.comments).system;
};

/**
 * Get the last comment
 *
 * @return {Object}
 */
Update.prototype.getLastComment = function() {
    if (!this.comments) return false;
    if (this.comments.length < 1) return false;
    return mout.array.last(this.comments);
};

/**
 * Check if update is related to an activity
 *
 * @return {Boolean}
 */
Update.prototype.isActivityUpdate = function() {
    return /^partups_activities/.test(this.type) || (
        this.type === 'partups_comments_added' &&
        !this.type_data.contribution_id
    );
};

/**
 * Check if update is related to a contribution
 *
 * @return {Boolean}
 */
Update.prototype.isContributionUpdate = function() {
    return /^partups_(contributions|ratings)/.test(this.type) || (
        this.type === 'partups_comments_added' &&
        this.type_data.contribution_id
    );
};

/**
 * @namespace Updates
 * @memberOf Collection
 */
Updates = new Mongo.Collection('updates', {
    transform: function(document) {
        return new Update(document);
    }
});

// Add indices
if (Meteor.isServer) {
    Updates._ensureIndex('type');
    Updates._ensureIndex('upper_id');
    Updates._ensureIndex('partup_id');
}

/**
 * Find updates for an activity
 *
 * @memberOf Updates
 * @param {Activity} activity
 * @return {Mongo.Cursor}
 */
Updates.findForActivity = function(activity) {
    return Updates.find({_id: activity.update_id}, {limit: 1});
};

/**
 * Find updates for partup
 *
 * @memberOf Updates
 * @param {Partup} partup
 * @param {Object} parameters
 * @param {Number} parameters.limit
 * @param {String} parameters.filter
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Updates.findForPartup = function(partup, parameters, userId) {
    var parameters = parameters || {};

    if (Meteor.isClient && !userId) {
        userId = Meteor.userId();
    }

    var selector = {partup_id: partup._id};
    var options = {sort: {updated_at: -1}};

    if (parameters.limit) {
        options.limit = parseInt(parameters.limit);
    }

    if (parameters.filter) {
        var filter = parameters.filter;

        if (filter === 'my-updates') {
            selector.upper_id = userId;
        } else if (filter === 'activities') {
            selector.type = {$regex: '.*activities.*'};
        } else if (filter === 'partup-changes') {
            var regex = '.*(tags|end_date|name|description|image|budget).*';
            selector.type = {$regex: regex};
        } else if (filter === 'messages') {
            selector.type = {$regex: '.*message.*'};
        } else if (filter === 'contributions') {
            selector.type = {$regex: '.*contributions.*'};
        }
    }

    return this.find(selector, options);
};
