Meteor.startup(function () {
    // Users
    if (!Meteor.users.find().count()) {
        var adminUser = {
            name: 'Admin User',
            password: 'admin',
            email: 'admin@example.com'
        };
        var adminId = Meteor.users.insert(adminUser);

        var user = {
            name: 'Test User',
            password: 'test',
            email: 'user@example.com'
        };
        var userId = Meteor.users.insert(user);
    }

    if (!Partups.find().count()) {
        var firstPartup = {
            name: 'First awesome Part-Up!',
            description: "This describes just how great this Part-up is, so please join and let's make it the best part-up on the web.",
            creator_id: adminId,
            tags: ['partup', 'online', 'awesome', 'test'],
            uppers: [adminId, userId],
            end_date: Date.now()
        };
        var firstPartupId = Partups.insert(firstPartup);

        var secondPartup = {
            name: 'Develop new website for our startup',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus elit, fringilla maximus diam ac, porttitor pellentesque velit. Pellentesque vehicula id urna et varius. Donec feugiat neque pulvinar suscipit blandit. Donec sed libero id mauris tincidunt euismod. Proin non nunc orci. Vivamus nec est hendrerit enim scelerisque dignissim vel et orci. Aliquam luctus eros et orci tempus, sit amet mollis diam viverra.',
            creator_id: userId,
            tags: ['test', 'lorem', 'ipsum'],
            uppers: [adminId],
            supporters: [userId],
            end_date: Date.now()
        };
        var secondPartupId = Partups.insert(secondPartup);
    }

    if (!Activities.find().count()) {
        var firstActivity = {
            partup_id: firstPartupId,
            name: 'First activity',
            description: 'We need to define some activities here.',
            creator_id: adminId,
            end_date: Date.now()
        };
        Activities.insert(firstActivity);

        var secondActivity = {
            partup_id: firstPartupId,
            name: 'And another activity to demonstrate this concept',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus elit, fringilla maximus diam ac, porttitor pellentesque velit. Pellentesque vehicula id urna et varius. Donec feugiat neque pulvinar suscipit blandit. Donec sed libero id mauris tincidunt euismod. Proin non nunc orci.',
            creator_id: userId,
            end_date: Date.now()
        };
        Activities.insert(secondActivity);

        var thirdActivity = {
            partup_id: secondPartupId,
            name: 'We are all about activities',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus elit, fringilla maximus diam ac, porttitor pellentesque velit. Pellentesque vehicula id urna et varius. Donec feugiat neque pulvinar suscipit blandit. Donec sed libero id mauris tincidunt euismod. Proin non nunc orci.',
            creator_id: adminId,
            end_date: Date.now()
        };
        Activities.insert(thirdActivity);
    }

});