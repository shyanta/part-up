Template.BoardView.onCreated(function() {
    var template = this;
    var partupId = template.data.partupId;

    template.editLane = new ReactiveVar(undefined);
    template.addLane = new ReactiveVar(false);

    template.loaded = new ReactiveVar(false, function(a, b) {
        if (!b) return;
        lodash.defer(function() {
            template.createLanes();
        });
    });

    template.subscribe('board.for_partup_id', partupId, {
        onReady: function() {
            template.loaded.set(true);
        }
    });

    var arraysAreTheSame = function(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    };

    var callBoardUpdate = function(laneIds) {
        var board = Boards.findOne();
        if (!board) return;

        Meteor.call('boards.update', board._id, {lanes: laneIds || []}, function(err, res) {
            if (err) return Partup.client.notify.error('something went wrong');
        });
    };

    template.updateBoard = function() {
        var boardLanes = template.$('[data-sortable-board] [data-lane]');
        var lanes = $.map(boardLanes, function(laneElement, index) {
            return $(laneElement).data('lane');
        });

        // Update board lanes.
        callBoardUpdate(lanes);
    };

    var callLaneUpdateActivities = function(laneId, activityIds) {
        if (!laneId) return;
        Meteor.call('lanes.update_activities', laneId, activityIds || [], function(err, res) {
            if (err) return Partup.client.notify.error('something went wrong');
        });
    };

    var callActivityUpdateLane = function(activityId, laneId) {
        if (!activityId || !laneId) return;
        Meteor.call('activities.update_lane', activityId, laneId, function(err, res) {
            if (err) return Partup.client.notify.error('something went wrong');
        });
    };

    template.updateLane = function(fromLane, toLane, activity) {
        var $fromLane = $(fromLane);
        var $toLane = $(toLane);
        var $activity = $(activity);

        var fromLaneId = $fromLane.data('sortable-lane');
        var toLaneId = $toLane.data('sortable-lane');
        var activityId = $activity.data('activity');

        var fromLaneActivityElements = $fromLane.find('[data-activity]');
        var toLaneActivityElements = $toLane.find('[data-activity]');

        var fromLaneActivities = $.map(fromLaneActivityElements, function(activityElement, index) {
            return $(activityElement).data('activity');
        });

        var toLaneActivities = $.map(toLaneActivityElements, function(activityElement, index) {
            return $(activityElement).data('activity');
        });

        // lane.onSort will be called twice if the activity is moved to another lane,
        // once if it is moved up or down in the same lane.
        // Because of this we compare the two lanes (fromLane and toLane):
        // If they are the same, we update only the fromLane.
        // If they differ, we update the toLane and the activity that is moved.
        // This way we make sure only one update call is executed per lane.
        if (arraysAreTheSame(fromLaneActivities, toLaneActivities)) {
            callLaneUpdateActivities(fromLaneId, fromLaneActivities);

        } else {
            callLaneUpdateActivities(toLaneId, toLaneActivities);
            callActivityUpdateLane(activityId, toLaneId);
        }
    };

    template.updateLaneName = function(laneId, name) {
        if (!laneId || !name) return;
        Meteor.call('lanes.update_name', laneId, name, function(err, res) {
            if (err) return Partup.client.notify.error('something went wrong');
        });
    };

    template.callInsertLane = function(laneName) {
        var board = Boards.findOne();
        if (!board || !laneName) return;

        Meteor.call('lanes.insert', board._id, {name: laneName}, function(err, res) {
            if (err) return Partup.client.notify.error('something went wrong');
            template.refresh();
        });
    };

    template.createBoard = function() {
        var boardElement = template.$('[data-sortable-board]')[0];

        template.sortableBoard = Sortable.create(boardElement, {
            group: {
                name: 'board',
                pull: false,
                put: false
            },
            draggable: '.pu-js-sortable-lane',
            onUpdate: function(event) {
                template.updateBoard();
            }
        });
    };

    template.sortableLanes = [];
    template.createLanes = function() {
        template.$('[data-sortable-lane]').each(function(index, laneElement) {
            var sortableLane = Sortable.create(laneElement, {
                group: {
                    name: $(laneElement).data('lane'),
                    pull: function() {
                        return true; // pull from any lane
                    },
                    put: function() {
                        return true; // put to any lane
                    }
                },
                draggable: '.pu-js-sortable-card',
                onSort: function(event) {
                    template.updateLane(event.from, event.to, event.item);
                }
            });

            template.sortableLanes.push(sortableLane);
        });
    };

    template.destroy = function() {
        for (var i = 0; i < template.sortableLanes.length; i++) {
            var lane = template.sortableLanes.pop();
            lane.destroy();
        }

        template.sortableBoard.destroy();
    };

    template.refresh = function() {
        console.log('refresh');
        template.destroy();
        template.createBoard();
        lodash.defer(function() {
            template.createLanes();
        });
    };
});

Template.BoardView.onRendered(function() {
    var template = this;
    template.createBoard();
});

Template.BoardView.onDestroyed(function() {
    var template = this;
    template.destroy();
});

Template.BoardView.events({
    'click [data-lane-name]': function(event, template) {
        event.preventDefault();
        template.editLane.set($(event.currentTarget).data('lane-name'));
        lodash.defer(function() {
            $('[data-lane-name-input]').focus();
            $('[data-lane-name-input]')[0].select();
        });
    },
    'keyup [data-lane-name-input]': function(event, template) {
        var value = $(event.currentTarget).val();
        var laneId = $(event.currentTarget).data('lane-name-input');
        if (event.keyCode === 13) {
            template.editLane.set(undefined);
            template.updateLaneName(laneId, value);
        }
    },
    'keyup [data-add-lane-input]': function(event, template) {
        var value = $(event.currentTarget).val();
        if (event.keyCode === 13) {
            template.addLane.set(false);
            template.callInsertLane(value);
        }
    },
    'blur [data-add-lane-input]': function(event, template) {
        template.addLane.set(false);
    },
    'blur [data-lane-name-input]': function(event, template) {
        var value = $(event.currentTarget).val();
        var laneId = $(event.currentTarget).data('lane-name-input');
        template.editLane.set(undefined);
        template.updateLaneName(laneId, value);
    },
    'click [data-add-button]': function(event, template) {
        event.preventDefault();
        var laneId = $(event.currentTarget).data('add-button');
        template.data.onAdd(laneId);
    },
    'click [data-remove-button]': function(event, template) {
        event.preventDefault();
        var laneId = $(event.currentTarget).data('remove-button');
        Meteor.call('lanes.remove', laneId, function(err, res) {
            if (err) return Partup.client.notify.error('something went wrong');
            template.refresh();
        });
    },
    'click [data-add-lane]': function(event, template) {
        event.preventDefault();
        template.addLane.set(true);
        lodash.defer(function() {
            $('[data-add-lane-input]').focus();
        });
    }
});

Template.BoardView.helpers({
    lanes: function() {
        var board = Boards.findOne();
        if (!board) return undefined;
        return (board && board.lanes || []).map(function(laneId, laneIndex) {
            var lane = Lanes.findOne(laneId);

            if (!lane) return [];

            lane.activities = (lane && lane.activities || []).map(function(activityId, activityIndex) {
                return Activities.findOne(activityId);
            }).filter(function(activity) { return !!activity; });

            return lane;
        });
    },
    editLane: function() {
        return Template.instance().editLane.get();
    },
    addLane: function() {
        return Template.instance().addLane.get();
    }
});

