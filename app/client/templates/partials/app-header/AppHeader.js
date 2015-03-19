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

    'click [data-translate]': function EventClickTranslate (event, template) {
        var language = $(event.currentTarget).data("translate");
        TAPi18n.setLanguage(language).done(function () {
            // it worked
        }).fail(function (error_message) {
            // Handle the situation
            console.log(error_message);
        });
    },

    'click [data-login]': function EventClickLogin (event, template) {
        Meteor.loginWithLinkedin();
    }

});
