/**
 * Lane model
 *
 * @memberOf Lanes
 */
var Lane = function(document) {
    _.extend(this, document);
};

/**
 * Add an activity to the lane
 *
 * @memberOf Lanes
 */
Lane.prototype.addActivity = function(activityId) {
    Lanes.update(this._id, {$addToSet: {activities: activityId}});
};

/**
 * Remove a specific activity from the lane
 *
 * @memberOf Lanes
 */
Lane.prototype.removeActivity = function(activityId) {
    var activities = this.activities || [];
    var activityIndex = activities.indexOf(activityId);
    if (activityIndex > -1) {
        activities = activities.splice(activityIndex, 1);
    }

    // Store the updated activities
    Lanes.update(this._id, {$set: {activities: activities}});
};

/**
 @namespace Lanes
 */
Lanes = new Mongo.Collection('lanes', {
    transform: function(document) {
        return new Lane(document);
    }
});

/**
 * Find the lanes for a board
 *
 * @memberOf Lanes
 * @param {Board} board
 * @return {Mongo.Cursor}
 */
Lanes.findForBoard = function(board) {
    return Lanes.find({board_id: board._id});
};
