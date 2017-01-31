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
 * Remove a specific lane from a board
 *
 * @memberOf Boards
 *
 */
Board.prototype.removeLane = function(laneId) {
    var lanes = this.lanes || [];
    var laneIndex = lanes.indexOf(laneId);
    if (laneIndex > -1) {
        lanes.splice(laneIndex, 1);
    }

    // Store the updated lane list
    Boards.update(this._id, {$set: {lanes: lanes}});
};

/**
 @namespace Boards
 */
Boards = new Mongo.Collection('boards', {
    transform: function(document) {
        return new Board(document);
    }
});

/**
 * Find the board for a partup
 *
 * @memberOf Boards
 * @param {Partup} partup
 * @param {String} userId
 * @return {Mongo.Cursor}
 */
Boards.findForPartup = function(partup, userId) {
    if (!partup.isViewableByUser(userId)) return null;
    return Boards.find({_id: partup.board_id}, {limit: 1});
};
