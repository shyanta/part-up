/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.PartialsAppHeader.helpers({

    notifications: function () {
        return Notifications.find();
    }

});


/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsAppHeader.events({

    'click [data-login]': function EventClickLogin (event, template) {
        Meteor.loginWithLinkedin();
    }

});
