Template.BoardView.onCreated(function() {
    var template = this;
    var partupId = 'hSCFmnoDi4hvmb9GR';

    template.board = {
        _id: 'hfdskfgyu',
        created_at: new Date(),
        partup_id: partupId,
        updated_at: new Date(),
        lanes: ['hfdsail','gfdauyew','hfewyid']
    };

    template.lanes = [{
        _id: 'hfdsail',
        name: 'Backlog',
        board_id: 'hfdskfgyu',
        created_at: new Date(),
        updated_at: new Date(),
        activities: ['tj8M62M52Sa7MwMnZ', 'vAMWQP5vQZzScpQeb', 'X7h7ruFCZr7qtGGez', 'cq5dK2CkZHbsRLsY2', 'kLy8ub6qCytinCGbB']
    },{
        _id: 'gfdauyew',
        name: 'Verify',
        board_id: 'hfdskfgyu',
        created_at: new Date(),
        updated_at: new Date(),
        activities: ['vEoGorDunHjRLrX9v', 'CjvSRHF3afmFbxuY8']
    },{
        _id: 'hfewyid',
        name: 'Done',
        board_id: 'hfdskfgyu',
        created_at: new Date(),
        updated_at: new Date(),
        activities: ['EQoA2RF74qbrzkK9Z', 'SL7z9zCE6PSnfRH4R']
    }];
});

Template.BoardView.helpers({
    lanes: function() {
        var template = Template.instance();

        return (template.board.lanes || []).map(function(laneId, index) {
            var lane = lodash.find(template.lanes, {_id: laneId});

            lane.activities = (lane.activities || []).map(function(activityId) {
                return Activities.findOne(activityId);
            }).filter(function(activity) { return !!activity; });

            return lane;
        });
    }
});

