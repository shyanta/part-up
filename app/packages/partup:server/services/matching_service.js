/**
 @namespace Partup server matching service
 @name Partup.server.services.matching
 @memberof Partup.server.services
 */
Partup.server.services.matching = {

    matchUppersForActivity: function(activityId, query) {
        var activity = Activities.findOneOrFail(activityId);
        var partup = Partups.findOneOrFail(activity.partup_id);

        var selector = {};
        var options = {};
        var query = query || {};

        // Match the uppers on the tags used in the partup
        var tags = partup.tags || [];
        selector['profile.tags'] = {'$in': partup.tags};

        // Filter the uppers of the partup as these are not valid suggestions
        var uppers = partup.uppers || [];
        selector['_id'] = {'$nin': uppers};

        // Sort the uppers on average rating
        options['sort'] = {'average_rating': -1};

        // Get the results, if there are none, we remove some matching steps
        var results = Meteor.users.find(selector, options).fetch();
        var iteration = 0;

        while (results.length === 0) {
            if (iteration === 0) delete selector['profile.tags'];

            results = Meteor.users.find(selector, options).fetch();
            iteration++;
        }

        // And finally, sort the results based on location and search input
        if (query.locationId) {
            results = _.sortBy(results, function(upper) {
                if (!upper.profile.location || !upper.profile.location.place_id) return false;
                return upper.profile.location.place_id == query.locationId;
            });
        }
        if (query.query) {
            results = _.sortBy(results, function(upper) {
                var regex = new RegExp('.*' + query.query + '.*', 'i');
                return !!upper.name.match(regex);
            });
        }

        // The sorting causes the array to be sorted backwards, so we need to return the reversed results
        return results.reverse();
    }

};
