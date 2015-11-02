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
        //console.log(token);

        // Create user if needed
        if (!upper.profile.meurs_id) {
            var q4youId = Partup.server.services.meurs.addUser(token, upper._id, User(upper).getEmail());
            //console.log(q4youId);
            Meteor.users.update(upper._id, {$set: {'profile.meurs_id': q4youId}});
        }

        // Activate user
        var isUserActivated = Partup.server.services.meurs.activateUser(token, q4youId);
        if (!isUserActivated) return false;

        // Get Program Templates
        //var programTemplates = Partup.server.services.meurs.getProgramTemplates(token);
        //console.log(programTemplates);

        // Create Program Session
        var programSessionId = Partup.server.services.meurs.createProgramSessionId(token, q4youId);
        //console.log(programSessionId);

        // Activate Program Session
        var isProgramSessionActivated = Partup.server.services.meurs.setActiveProgramSession(token, q4youId, programSessionId);
        if (!isProgramSessionActivated) return false;

        // Get Program Session Content
        //var programSessionContent = Partup.server.services.meurs.getProgramSessionContent(token, q4youId, programSessionId);
        //console.log(programSessionContent);

        // Get Browser Token
        var returnUrl = Meteor.absoluteUrl() + 'profile/' + upper._id + '/about';

        return Partup.server.services.meurs.getBrowserToken(token, q4youId, returnUrl);
    }
});
