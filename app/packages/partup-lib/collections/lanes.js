/**
 * Lane model
 *
 * @memberOf Lanes
 */
var Lane = function(document) {
    _.extend(this, document);
};

/**
 * Remove a specific activity from a lane
 *
 * @memberOf Lanes
 *
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
