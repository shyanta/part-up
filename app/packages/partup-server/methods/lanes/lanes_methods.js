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
            });

            // Update the board
            Boards.update(board._id, {$addToSet: {lanes: laneId}});

            return laneId;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'lane_could_not_be_inserted');
        }
    },

    /**
     * Insert a lane on a board
     *
     * @param laneId
     * @param {mixed[]} fields
     */
    'lanes.update': function(laneId, fields) {
        check(laneId, String);
        check(fields, Partup.schemas.forms.lane);

        this.unblock();

        // Check if user is logged in and partner of the partup
        var user = Meteor.user();
        var lane = Lanes.findOneOrFail(laneId);
        var board = Boards.findOneOrFail(lane.board_id);
        if (!user || !User(user).isPartnerInPartup(board.partup_id)) throw new Meteor.Error(401, 'unauthorized');

        try {
            var updatedLane = Partup.transformers.lane.fromForm(fields);
            Lanes.update(laneId, {$set: updatedLane});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'lane_could_not_be_updated');
        }
    },

    /**
     * Insert a lane on a board
     *
     * @param laneId
     * @param {mixed[]} fields
     */
    'lanes.update_activities': function(laneId, activityIds) {
        check(laneId, String);
        check(activityIds, [String]);

        this.unblock();

        // Check if user is logged in and partner of the partup
        var user = Meteor.user();
        var lane = Lanes.findOneOrFail(laneId);
        var board = Boards.findOneOrFail(lane.board_id);
        if (!user || !User(user).isPartnerInPartup(board.partup_id)) throw new Meteor.Error(401, 'unauthorized');

        var activities = lodash.uniq(activityIds);

        try {
            Lanes.update(laneId, {$set: {activities: activities, updated_at: new Date()}});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'lane_could_not_be_updated');
        }
    },

    /**
     * Insert a lane on a board
     *
     * @param laneId
     * @param {String} name
     */
    'lanes.update_name': function(laneId, name) {
        check(laneId, String);
        check(name, String);

        this.unblock();

        // Check if user is logged in and partner of the partup
        var user = Meteor.user();
        var lane = Lanes.findOneOrFail(laneId);
        var board = Boards.findOneOrFail(lane.board_id);
        if (!user || !User(user).isPartnerInPartup(board.partup_id)) throw new Meteor.Error(401, 'unauthorized');

        try {
            Lanes.update(laneId, {$set: {name: name, updated_at: new Date()}});
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'lane_could_not_be_updated');
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

        // Don't remove if this is the only lane of the board
        if (board.lanes.length < 2) throw new Meteor.Error(400, 'lane_could_not_be_deleted');

        try {
            board.removeLane(lane._id, lane.activities);
            Lanes.remove(lane._id);
        } catch (error) {
            throw new Meteor.Error(400, 'lane_could_not_be_deleted');
        }
    }
});
