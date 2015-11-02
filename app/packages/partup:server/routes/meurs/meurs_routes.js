Router.route('/meurs/finished', {where: 'server'}).post(function() {
    var data = this.request.body;
    var response = this.response;

    // We are going to respond in JSON format
    response.setHeader('Content-Type', 'application/json');

    if (!data || data.eventType !== 10 || !data.candidateId || !data.programSessionId) {
        // Nothing to do here
        return response.end('Not enough data');
    }

    // Get Upper
    var upper = Meteor.users.findOne({'profile.meurs_id': data.candidateId});
    if (!upper) return response.end('No Upper found with given candidateId');

    // Get results from Meurs
    // Authenticate
    var token = Partup.server.services.meurs.getToken();
    var results = Partup.server.services.meurs.getResults(token, upper.profile.meurs_id, data.programSessionId);

    //return response.end(results); // Test

    if (results) {
        Meteor.users.update({_id: upper._id}, {$set: {'profile.results': results}});
    }

    // This POST request was automated and they don't expect anything in return
    return response.end('Done.');
});
