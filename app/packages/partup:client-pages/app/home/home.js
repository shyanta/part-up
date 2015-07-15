/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_home.helpers({
    firstPartup: function() {
        return Partups.findOne();
    },
    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_home.events({
    'click [data-translate]': function clickTranslate (event, template) {
        var language = $(event.currentTarget).data('translate');
        Partup.client.language.change(language);
    }
});
