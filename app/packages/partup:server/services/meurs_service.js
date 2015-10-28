var d = Debug('services:meurs');

/**
 @namespace Partup server meurs service
 @name Partup.server.services.meurs
 @memberof Partup.server.services
 */
Partup.server.services.meurs = {
    getToken: function() {
        try {
            var result = HTTP.post(process.env.MEURS_BASE_URL + 'authenticator/api/authenticate', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    'apiKey': process.env.MEURS_API_KEY,
                    'apiSecret': process.env.MEURS_API_SECRET
                }
            });

            if (result.statusCode !== 200 || result.data.errors.length > 0) {
                Log.error(result.statusCode, result.data.errors);
                throw new Meteor.Error(400, 'Error while authenticating with Meurs: ' + error);
            }

            return result.data.authToken;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Error while authenticating with Meurs: ' + error);
        }
    },

    addUser: function(token, userId, email) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        try {
            var result = HTTP.post(process.env.MEURS_BASE_URL + 'authenticator/api/adduser', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    'authToken': token,
                    'userName': userId,
                    'password': userId,
                    'email': email
                }
            });

            if (result.statusCode !== 200 || result.data.errors.length > 0) {
                Log.error(result.statusCode, result.data.errors);
                throw new Meteor.Error(400, 'Error while adding user to Meurs: ' + error);
            }

            return result.data.q4youID;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Error while adding user to Meurs: ' + error);
        }
    },

    activateUser: function(token, q4youId) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        try {
            var result = HTTP.post(process.env.MEURS_BASE_URL + 'authenticator/api/activateuser', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    'authToken': token,
                    'q4youID': q4youId
                }
            });

            if (result.statusCode !== 200 || result.data.errors.length > 0) {
                Log.error(result.statusCode, result.data.errors);
                throw new Meteor.Error(400, 'Error while adding user to Meurs: ' + error);
            }

            // No errors, can only be successful at this point
            return true;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Error while adding user to Meurs: ' + error);
        }
    },
};
