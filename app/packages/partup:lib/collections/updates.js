/**
 * Partup model
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
Updates.findByFilter = function(partupId, filter, limit) {
    if (!partupId) return;
    var limit = limit || 10;
    var filter = filter || 'default';

    var criteria = {partup_id: partupId};

    if (filter === 'my-updates') {
        criteria.upper_id = self.userId;
    } else if (filter === 'activities') {
        criteria.type = {$regex: '.*activities.*'};
    } else if (filter === 'partup-changes') {
        var regex = '.*(tags|end_date|name|description|image|budget).*';
        criteria.type = {$regex: regex};
    } else if (filter === 'messages') {
        criteria.type = {$regex: '.*message.*'};
    } else if (filter === 'contributions') {
        criteria.type = {$regex: '.*contributions.*'};
    }

    return this.find(criteria, {limit: limit, sort: {updated_at: -1}});
};
