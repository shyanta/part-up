/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.PartialsAppHeader.helpers({

});


/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsAppHeader.events({

    'click [data-login]': function EventClickLogin (event, template) {
        Meteor.loginWithLinkedin();
    }

});
