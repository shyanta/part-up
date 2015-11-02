var d = Debug('services:meurs');

var meursCall = function(url, data) {
    try {
        var result = HTTP.post(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        });

        if (result.statusCode !== 200 || result.data.errors.length > 0) {
            Log.error('[Meurs API Error] Url: [' + url + ']. Status code: [' + result.statusCode + ']. Errors: ', result.data.errors);
            throw new Meteor.Error(400, '[Meurs API Error] Url: [' + url + ']. Status code: [' + result.statusCode + ']. Errors: ', result.data.errors);
        }

        // No errors
        return result;
    } catch (error) {
        Log.error(error);
        throw new Meteor.Error(400, '[Meurs API Exception] Url: [' + url + ']. Errors: ', error);
    }
};

/**
 @namespace Partup server meurs service
 @name Partup.server.services.meurs
 @memberof Partup.server.services
 */
Partup.server.services.meurs = {
    getToken: function() {
        var result = meursCall(process.env.MEURS_BASE_URL + 'authenticator/api/authenticate', {
            apiKey: process.env.MEURS_API_KEY,
            apiSecret: process.env.MEURS_API_SECRET
        });

        return result.data.authToken;
    },

    addUser: function(token, userId, email) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'authenticator/api/adduser', {
            authToken: token,
            userName: userId,
            password: '@' + userId,
            email: email
        });

        return result.data.q4youID;
    },

    activateUser: function(token, q4youId) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'authenticator/api/activateuser', {
            authToken: token,
            q4youID: q4youId
        });

        return result.data.errors.length < 1;
    },

    getProgramTemplates: function(token) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'q4u/api/getprogramtemplates', {
            authToken: token
        });

        return result.data.templates;
    },

    createProgramSessionId: function(token, q4youId) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'q4u/api/createprogramsession', {
            authToken: token,
            q4youID: q4youId,
            programTemplateId: process.env.MEURS_PROGRAM_TEMPLATE_ID
        });

        return result.data.programSessionId;
    },

    setActiveProgramSession: function(token, q4youId, programSessionId) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'q4u/api/setactiveprogramsession', {
            authToken: token,
            q4youID: q4youId,
            programSessionId: programSessionId
        });

        return result.data.errors.length < 1;
    },

    getProgramSessionContent: function(token, q4youId, programSessionId) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'q4u/api/getprogramsessioncontent', {
            authToken: token,
            q4youID: q4youId,
            programSessionId: programSessionId
        });

        return result.data.content.services;
    },

    getBrowserToken: function(token, q4youId, returnUrl) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'q4u/api/getbrowsertoken', {
            authToken: token,
            q4youID: q4youId,
            returnUrl: returnUrl,
            startPageId: 1,
            autoStartServiceId: process.env.MEURS_SERVICE_ID
        });

        return result.data.url;
    },

    getResults: function(token, q4youId, programSessionId) {
        if (!token) {
            d('No authentication token given');
            throw new Meteor.Error(400, 'Token needed for Meurs API');
        }

        var result = meursCall(process.env.MEURS_BASE_URL + 'q4u/api/getServiceSessionResults', {
            authToken: token,
            q4youID: q4youId,
            programSessionId: programSessionId
        });

        return result.data;
    }
};
