Meteor.methods({
    /**
     * Retrieve an authentication token
     */
    'meurs.create_test': function() {
        this.unblock();

        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'unauthorized');

        // Authenticate
        var token = Partup.server.services.meurs.getToken();
        console.log(token);
        // Create user
        var q4youId = Partup.server.services.meurs.addUser(token, upper._id, upper.getEmail());
        console.log(q4youId);
        // Activate user
        var isActivated = Partup.server.services.meurs.activateUser(token, q4youId);
        console.log(isActivated);
    }
});
