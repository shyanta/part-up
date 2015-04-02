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
                required:            TAPi18n.__('error-ss-required'),
                minString:           TAPi18n.__('error-ss-minString'),
                maxString:           TAPi18n.__('error-ss-maxString'),
                minNumber:           TAPi18n.__('error-ss-minNumber'),
                maxNumber:           TAPi18n.__('error-ss-maxNumber'),
                minDate:             TAPi18n.__('error-ss-minDate'),
                maxDate:             TAPi18n.__('error-ss-maxDate'),
                badDate:             TAPi18n.__('error-ss-badDate'),
                minCount:            TAPi18n.__('error-ss-minCount'),
                maxCount:            TAPi18n.__('error-ss-maxCount'),
                noDecimal:           TAPi18n.__('error-ss-noDecimal'),
                notAllowed:          TAPi18n.__('error-ss-notAllowed'),
                expectedString:      TAPi18n.__('error-ss-expectedString'),
                expectedNumber:      TAPi18n.__('error-ss-expectedNumber'),
                expectedBoolean:     TAPi18n.__('error-ss-expectedBoolean'),
                expectedArray:       TAPi18n.__('error-ss-expectedArray'),
                expectedObject:      TAPi18n.__('error-ss-expectedObject'),
                expectedConstructor: TAPi18n.__('error-ss-expectedConstructor'),
                keyNotInSchema:      TAPi18n.__('error-ss-keyNotInSchema'),
                regEx: [
                    {                                    msg: TAPi18n.__('error-ss-regex-default')},
                    {exp: SimpleSchema.RegEx.Email,      msg: TAPi18n.__('error-ss-regex-Email')},
                    {exp: SimpleSchema.RegEx.WeakEmail,  msg: TAPi18n.__('error-ss-regex-WeakEmail')},
                    {exp: SimpleSchema.RegEx.Domain,     msg: TAPi18n.__('error-ss-regex-Domain')},
                    {exp: SimpleSchema.RegEx.WeakDomain, msg: TAPi18n.__('error-ss-regex-WeakDomain')},
                    {exp: SimpleSchema.RegEx.IP,         msg: TAPi18n.__('error-ss-regex-IP')},
                    {exp: SimpleSchema.RegEx.IPv4,       msg: TAPi18n.__('error-ss-regex-IPv4')},
                    {exp: SimpleSchema.RegEx.IPv6,       msg: TAPi18n.__('error-ss-regex-IPv6')},
                    {exp: SimpleSchema.RegEx.Url,        msg: TAPi18n.__('error-ss-regex-Url')},
                    {exp: SimpleSchema.RegEx.Id,         msg: TAPi18n.__('error-ss-regex-Id')},
                ],
                passwordMismatch:      TAPi18n.__('error-ss-passwordMismatch')
            });

        }).fail(function (error_message) {
            Partup.ui.notify.error('Could not load the language "' + language + '"');
        });
    }

};