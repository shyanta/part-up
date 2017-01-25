Meteor.methods({
    /**
     * Insert a lane on a board
     *
     * @param boardId
     * @param {mixed[]} fields
     */
    'lanes.insert': function(boardId, fields) {
        check(boardId, String);
        check(fields, Partup.schemas.forms.lane);

        this.unblock();

        // Check if user is logged in and partner of the partup
        var user = Meteor.user();
        var board = Boards.findOneOrFail(boardId);
        if (!user || !User(user).isPartnerInPartup(board.partup_id)) throw new Meteor.Error(401, 'unauthorized');

        try {
            var laneId = Random.id();
            Lanes.insert({
                _id: laneId,
                activities: [],
                board_id: board._id,
                created_at: new Date(),
                name: fields.name,
                updated_at: new Date()
            })
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'lane_could_not_be_inserted');
        }
    },

    /**
     * Remove a lane from the board
     *
     * @param {String} laneId
     */
    'lanes.remove': function(laneId) {
        check(laneId, String);

        // Check if user is logged in and partner of the partup
        var user = Meteor.user();
        var lane = Lanes.findOneOrFail(laneId);
        var board = Boards.findOneOrFail(lane.board_id);
        if (!user || !lane || !User(user).isPartnerInPartup(board.partup_id)) throw new Meteor.Error(401, 'unauthorized');

        try {
            board.removeLane(lane._id, lane.activities);
            Lanes.remove(lane._id);
        } catch (error) {
            throw new Meteor.Error(400, 'lane_could_not_be_deleted');
        }
    }
});
