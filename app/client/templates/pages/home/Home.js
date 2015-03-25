/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesHome.helpers({
    
    firstPartup: function () {
        return Partups.findOne();
    }

});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesHome.events({

    'click [data-translate]': function clickTranslate (event, template) {
        var language = $(event.currentTarget).data("translate");
        TAPi18n.setLanguage(language).done(function () {
            moment.locale(language);
        }).fail(function (error_message) {
            Partup.notify.error('Could not load the language "' + language + '"');
        });
    }

});
