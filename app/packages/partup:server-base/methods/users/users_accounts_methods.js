Meteor.methods({
    /**
     * Retrieve u user's email address from token
     *
     * @param {string} token
     */
    'users.email.form.token': function (token) {
        try {
            return Meteor.users.find({ "services.resume.loginTokens": { $elemMatch: { hashedToken: token } } });
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Token [' + token + '] could not be found for a user.');
        }
    }
});