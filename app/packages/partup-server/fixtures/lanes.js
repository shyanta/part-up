Meteor.startup(function () {
    if (process.env.NODE_ENV.match(/development|staging/)) {

        if (!Lanes.find().count()) {

            /* ING - Semi Secret */
            /* 1) Backlog */
            Lanes.insert({
                '_id': 'OhElHekpR1I3PxUBt',
                'board_id': 'jMU371tasWnf0RYUh',
                'name': 'Backlog',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });
            /* ToDo */
            Lanes.insert({
                '_id': '7I8qkr9jKLISr7GQC',
                'board_id': 'jMU371tasWnf0RYUh',
                'name': 'ToDo',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });
            /* Doing */
            Lanes.insert({
                '_id': '1c18TM9EhTUbIMGCy',
                'board_id': 'jMU371tasWnf0RYUh',
                'name': 'Doing',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });
            /* Done */
            Lanes.insert({
                '_id': 'MURSLchoBESuQJVpn',
                'board_id': 'jMU371tasWnf0RYUh',
                'name': 'Done',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });


            /* Part-up developement */
            /* Backlog */
            Lanes.insert({
                '_id': 'M8yEL4e3zY7Ar4zwq',
                'board_id': 'ABcmVsH93LfFJr83P',
                'name': 'Backlog',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });
            /* ToDo */
            Lanes.insert({
                '_id': 'B17gCkMaSWtnKK4JZ',
                'board_id': 'ABcmVsH93LfFJr83P',
                'name': 'ToDo',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });
            /* Doing */
            Lanes.insert({
                '_id': 'J023aUccH2gmRFWQn',
                'board_id': 'ABcmVsH93LfFJr83P',
                'name': 'Doing',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });
            /* Done */
            Lanes.insert({
                '_id': '7tjMjDjMMSOS40zhu',
                'board_id': 'ABcmVsH93LfFJr83P',
                'name': 'Done',
                'activities': [],
                'created_at': new Date(),
                'updated_at': new Date()
            });
        }
    }
});
