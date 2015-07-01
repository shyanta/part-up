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
 @namespace Updates
 @name Updates
 */
Updates = new Mongo.Collection('updates', {
    transform: function(document) {
        return new Update(document);
    }
});

/**
 * Partups collection helpers
 */
Updates.findForUpdates = function(partupId, options) {
    if (!partupId) return;

    var options = options || {};
    var limit = options.limit || 10;
    var filter = options.filter || 'default';

    var selector = {partup_id: partupId};

    if (filter === 'my-updates') {
        selector.upper_id = self.userId;
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

    return this.find(selector, {limit: limit, sort: {updated_at: -1}});
};
