/**
 @namespace Partup server matching service
 @name Partup.server.services.matching
 @memberof Partup.server.services
 */
Partup.server.services.matching = {
    matchUppersForActivity: function(activityId) {
        var activity = Activities.findOneOrFail(activityId);
        var partup = Partups.findOneOrFail(activity.partup_id);

        var selector = {};
        var options = {};

        // Match the uppers on the tags used in the partup
        var tags = partup.tags || [];
        selector['profile.tags'] = {'$in': tags};

        // Filter the uppers of the partup as these are not valid suggestions
        var uppers = partup.uppers || [];
        selector['_id'] = {'$nin': uppers};

        // Sort the uppers on participation_score
        options['sort'] = {'participation_score': -1};

        // Get the results, if there are none, we remove some matching steps
        var results = Meteor.users.find(selector, options).fetch();
        var iteration = 0;

        while (results.length === 0) {
            if (iteration === 0) delete selector['profile.tags'];

            results = Meteor.users.find(selector, options).fetch();
            iteration++;
        }

        return results;
    },

    matchUppersForNetwork: function(networkId) {
        var network = Networks.findOneOrFail(networkId);

        var selector = {};
        var options = {};

        // Match the uppers on the tags used in the partup
        var tags = network.tags || [];
        selector['profile.tags'] = {'$in': tags};

        // Filter the uppers of the network as these are not valid suggestions
        var uppers = network.uppers || [];
        selector['_id'] = {'$nin': uppers};

        // Sort the uppers on participation_score
        options['sort'] = {'participation_score': -1};

        // Get the results, if there are none, we remove some matching steps
        var results = Meteor.users.find(selector, options).fetch();
        var iteration = 0;

        while (results.length === 0) {
            if (iteration === 0) delete selector['profile.tags'];

            results = Meteor.users.find(selector, options).fetch();
            iteration++;
        }

        return results;
    }
};
