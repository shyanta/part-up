Partup.ui.language = {

    /**
     * Set the language of partup
     *
     * @memberOf partup.ui
     * @param {String} language
     */
    changeLanguage: function(language) {
        TAPi18n.setLanguage(language).done(function() {

            // Change MomentJS language
            moment.locale(language);

            // Change datepicker language
            $.fn.datepicker.dates[language] = {
                days: moment.weekdays(),
                daysShort: moment.weekdaysShort(),
                daysMin: moment.weekdaysMin(),
                months: moment.months(),
                monthsShort: moment.monthsShort(),
                today: 'Today',
                clear: 'Clear'
            };

            // Change SimpleSchema error messages language
            SimpleSchema.messages({
                required:            __('base-ui-language-ss-required'),
                minString:           __('base-ui-language-ss-minString'),
                maxString:           __('base-ui-language-ss-maxString'),
                minNumber:           __('base-ui-language-ss-minNumber'),
                maxNumber:           __('base-ui-language-ss-maxNumber'),
                minDate:             __('base-ui-language-ss-minDate'),
                maxDate:             __('base-ui-language-ss-maxDate'),
                badDate:             __('base-ui-language-ss-badDate'),
                minCount:            __('base-ui-language-ss-minCount'),
                maxCount:            __('base-ui-language-ss-maxCount'),
                noDecimal:           __('base-ui-language-ss-noDecimal'),
                notAllowed:          __('base-ui-language-ss-notAllowed'),
                expectedString:      __('base-ui-language-ss-expectedString'),
                expectedNumber:      __('base-ui-language-ss-expectedNumber'),
                expectedBoolean:     __('base-ui-language-ss-expectedBoolean'),
                expectedArray:       __('base-ui-language-ss-expectedArray'),
                expectedObject:      __('base-ui-language-ss-expectedObject'),
                expectedConstructor: __('base-ui-language-ss-expectedConstructor'),
                keyNotInSchema:      __('base-ui-language-ss-keyNotInSchema'),
                regEx: [
                                                        {msg: __('base-ui-language-ss-regex-default')},
                    {exp: SimpleSchema.RegEx.Email,      msg: __('base-ui-language-ss-regex-Email')},
                    {exp: SimpleSchema.RegEx.WeakEmail,  msg: __('base-ui-language-ss-regex-WeakEmail')},
                    {exp: SimpleSchema.RegEx.Domain,     msg: __('base-ui-language-ss-regex-Domain')},
                    {exp: SimpleSchema.RegEx.WeakDomain, msg: __('base-ui-language-ss-regex-WeakDomain')},
                    {exp: SimpleSchema.RegEx.IP,         msg: __('base-ui-language-ss-regex-IP')},
                    {exp: SimpleSchema.RegEx.IPv4,       msg: __('base-ui-language-ss-regex-IPv4')},
                    {exp: SimpleSchema.RegEx.IPv6,       msg: __('base-ui-language-ss-regex-IPv6')},
                    {exp: SimpleSchema.RegEx.Url,        msg: __('base-ui-language-ss-regex-Url')},
                    {exp: SimpleSchema.RegEx.Id,         msg: __('base-ui-language-ss-regex-Id')},
                ],
                passwordMismatch:       __('base-ui-language-ss-passwordMismatch'),
                emailExists:            __('base-ui-language-ss-emailExists'),
                emailNotFound:          __('base-ui-language-ss-emailNotFound'),
                passwordIncorrect:      __('base-ui-language-ss-passwordIncorrect')
            });

        }).fail(function(error_message) {
            Partup.ui.notify.error('Could not load the language "' + language + '"');
        });
    }

};
