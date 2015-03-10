Template.header.events({
	'click [data-translate]': function(event, template) {
        var language = $(event.currentTarget).data("translate")
        TAPi18n.setLanguage(language).done(function () {
            // it worked
        }).fail(function (error_message) {
            // Handle the situation
            console.log(error_message);
        });
    },
    'click [data-logout]': function(event, template) {
        Meteor.logout();
    },
    'click [data-login]': function(event, template) {
        Meteor.loginWithLinkedin();
    }

})