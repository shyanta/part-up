Meteor.startup(function() {

    /*************************************************************/
    /* Language configuration */
    /*************************************************************/
    if(TAPi18n && Partup) {
        var language = TAPi18n.getLanguage() || 'en';
        Partup.language.changeLanguage(language);
    }
    
});