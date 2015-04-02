Partup.ui.language = {

    /**
     * Set the language of partup
     *
     * @memberOf partup.ui
     * @param {String} language
     */
    changeLanguage: function(language){
        TAPi18n.setLanguage(language).done(function () {

            // Change MomentJS language
            moment.locale(language);

            // Change datepicker language
            $.fn.datepicker.dates[language] = {
                days: moment.weekdays(),
                daysShort: moment.weekdaysShort(),
                daysMin: moment.weekdaysMin(),
                months: moment.months(),
                monthsShort: moment.monthsShort(),
                today: "Today",
                clear: "Clear"
            };

            // Change SimpleSchema error messages language
            SimpleSchema.messages({
                required:            TAPi18n.__('ss-error-required'),
                minString:           TAPi18n.__('ss-error-minString'),
                maxString:           TAPi18n.__('ss-error-maxString'),
                minNumber:           TAPi18n.__('ss-error-minNumber'),
                maxNumber:           TAPi18n.__('ss-error-maxNumber'),
                minDate:             TAPi18n.__('ss-error-minDate'),
                maxDate:             TAPi18n.__('ss-error-maxDate'),
                badDate:             TAPi18n.__('ss-error-badDate'),
                minCount:            TAPi18n.__('ss-error-minCount'),
                maxCount:            TAPi18n.__('ss-error-maxCount'),
                noDecimal:           TAPi18n.__('ss-error-noDecimal'),
                notAllowed:          TAPi18n.__('ss-error-notAllowed'),
                expectedString:      TAPi18n.__('ss-error-expectedString'),
                expectedNumber:      TAPi18n.__('ss-error-expectedNumber'),
                expectedBoolean:     TAPi18n.__('ss-error-expectedBoolean'),
                expectedArray:       TAPi18n.__('ss-error-expectedArray'),
                expectedObject:      TAPi18n.__('ss-error-expectedObject'),
                expectedConstructor: TAPi18n.__('ss-error-expectedConstructor'),
                keyNotInSchema:      TAPi18n.__('ss-error-keyNotInSchema'),
                regEx: [
                    {                                    msg: TAPi18n.__('ss-error-regex-default')},
                    {exp: SimpleSchema.RegEx.Email,      msg: TAPi18n.__('ss-error-regex-Email')},
                    {exp: SimpleSchema.RegEx.WeakEmail,  msg: TAPi18n.__('ss-error-regex-WeakEmail')},
                    {exp: SimpleSchema.RegEx.Domain,     msg: TAPi18n.__('ss-error-regex-Domain')},
                    {exp: SimpleSchema.RegEx.WeakDomain, msg: TAPi18n.__('ss-error-regex-WeakDomain')},
                    {exp: SimpleSchema.RegEx.IP,         msg: TAPi18n.__('ss-error-regex-IP')},
                    {exp: SimpleSchema.RegEx.IPv4,       msg: TAPi18n.__('ss-error-regex-IPv4')},
                    {exp: SimpleSchema.RegEx.IPv6,       msg: TAPi18n.__('ss-error-regex-IPv6')},
                    {exp: SimpleSchema.RegEx.Url,        msg: TAPi18n.__('ss-error-regex-Url')},
                    {exp: SimpleSchema.RegEx.Id,         msg: TAPi18n.__('ss-error-regex-Id')},
                ]
            });

        }).fail(function (error_message) {
            Partup.ui.notify.error('Could not load the language "' + language + '"');
        });
    }

};