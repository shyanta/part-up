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
    'click [data-translate]': function EventClickTranslate (event, template) {
        var language = $(event.currentTarget).data("translate");
        TAPi18n.setLanguage(language).done(function () {
            // it worked
            console.log('Work work')
        }).fail(function (error_message) {
            // Handle the situation
            console.log(error_message);
        });
    }
});