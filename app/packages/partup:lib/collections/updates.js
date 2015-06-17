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
 @namespace Updates
 @name Updates
 */
Updates = new Mongo.Collection('updates', {
    transform: function(document) {    
        return new Update(document);
    }
});
