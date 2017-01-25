/**
 * Board model
 *
 * @memberOf Boards
 */
var Board = function(document) {
    _.extend(this, document);
};

/**
 * Create the default set of lanes
 *
 * @memberOf Boards
 */
Board.prototype.createDefaultLaneSet = function() {
    var laneNames = ['Backlog', 'To do', 'Busy', 'Done'];
    var laneIds = [];
    var self = this;

    // Insert default set
    laneNames.forEach(function(laneName) {
        var laneId = Random.id();
        Lanes.insert({
            _id: laneId,
            activities: [],
            board_id: self._id,
            created_at: new Date(),
            name: laneName,
            updated_at: new Date()
        });
        laneIds.push(laneId);
    });

    // Store the lane IDs
    Boards.update(this._id, {$set: {lanes: laneIds}});
};

/**
 @namespace Boards
 */
Boards = new Mongo.Collection('boards', {
    transform: function(document) {
        return new Board(document);
    }
});
