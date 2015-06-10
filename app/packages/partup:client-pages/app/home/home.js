/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_home.helpers({
    firstPartup: function() {
        return Partups.findOne();
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_home.events({
    'click [data-translate]': function clickTranslate (event, template) {
        var language = $(event.currentTarget).data('translate');
        Partup.client.language.changeLanguage(language);
    }
});
