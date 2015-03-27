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
        Partup.ui.language.changeLanguage(language);
    }

});
