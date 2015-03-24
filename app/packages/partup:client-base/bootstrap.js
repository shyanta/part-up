/*************************************************************/
/* Language configuration */
/*************************************************************/
if(TAPi18n && moment) {
    var language = TAPi18n.getLanguage() || 'en';
    moment.locale(language);
}
