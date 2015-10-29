var respondWithError = function(response, statusCode, reason) {
    response.statusCode = statusCode;
    response.end(JSON.stringify({error: {reason: reason}}));
};

/**
 * Require authentication for certain server-side routes
 */
Router.onBeforeAction(function(request, response, next) {
    var token = request.query.token;

    if (!token) return respondWithError(response, 400, 'error-http-notoken');

    var user = Meteor.users.findOne({
        $or: [
            {'services.resume.loginTokens.hashedToken': Accounts._hashLoginToken(token)},
            {'services.resume.loginTokens.token': token}
        ]
    });

    if (!user) return respondWithError(response, 401, 'error-http-unauthorized');

    next();
}, {where: 'server', except: ['ping', 'partups.featured']});
