Partup.language = {
    /**
     * Set the language of partup
     *
     * @memberOf services.partup
     * @param {String} language
     */
    changeLanguage: function(language){
        TAPi18n.setLanguage(language).done(function () {
            moment.locale(language);

            $.fn.datepicker.dates[language] = {
                days: moment.weekdays(),
                daysShort: moment.weekdaysShort(),
                daysMin: moment.weekdaysMin(),
                months: moment.months(),
                monthsShort: moment.monthsShort(),
                today: "Today",
                clear: "Clear"
            };

        }).fail(function (error_message) {
            Partup.notify.error('Could not load the language "' + language + '"');
        });
    }
};