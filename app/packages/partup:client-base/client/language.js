Partup.client.language = {

    /**
     * Set the language of partup
     *
     * @memberOf Partup.client
     * @param {String} language
     */
    change: function(language) {
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

            // Change datepicker options
            Partup.client.datepicker.options.format = moment.localeData().longDateFormat('L').toLowerCase();
            Partup.client.datepicker.options.language = language;

            // Change SimpleSchema error messages language
            SimpleSchema.messages({
                required:            __('base-client-language-ss-required'),
                minString:           __('base-client-language-ss-minString'),
                maxString:           __('base-client-language-ss-maxString'),
                minNumber:           __('base-client-language-ss-minNumber'),
                maxNumber:           __('base-client-language-ss-maxNumber'),
                minDate:             __('base-client-language-ss-minDate'),
                maxDate:             __('base-client-language-ss-maxDate'),
                badDate:             __('base-client-language-ss-badDate'),
                minCount:            __('base-client-language-ss-minCount'),
                maxCount:            __('base-client-language-ss-maxCount'),
                noDecimal:           __('base-client-language-ss-noDecimal'),
                notAllowed:          __('base-client-language-ss-notAllowed'),
                expectedString:      __('base-client-language-ss-expectedString'),
                expectedNumber:      __('base-client-language-ss-expectedNumber'),
                expectedBoolean:     __('base-client-language-ss-expectedBoolean'),
                expectedArray:       __('base-client-language-ss-expectedArray'),
                expectedObject:      __('base-client-language-ss-expectedObject'),
                expectedConstructor: __('base-client-language-ss-expectedConstructor'),
                keyNotInSchema:      __('base-client-language-ss-keyNotInSchema'),
                regEx: [
                                                        {msg: __('base-client-language-ss-regex-default')},
                    {exp: SimpleSchema.RegEx.Email,      msg: __('base-client-language-ss-regex-Email')},
                    {exp: SimpleSchema.RegEx.WeakEmail,  msg: __('base-client-language-ss-regex-WeakEmail')},
                    {exp: SimpleSchema.RegEx.Domain,     msg: __('base-client-language-ss-regex-Domain')},
                    {exp: SimpleSchema.RegEx.WeakDomain, msg: __('base-client-language-ss-regex-WeakDomain')},
                    {exp: SimpleSchema.RegEx.IP,         msg: __('base-client-language-ss-regex-IP')},
                    {exp: SimpleSchema.RegEx.IPv4,       msg: __('base-client-language-ss-regex-IPv4')},
                    {exp: SimpleSchema.RegEx.IPv6,       msg: __('base-client-language-ss-regex-IPv6')},
                    {exp: SimpleSchema.RegEx.Url,        msg: __('base-client-language-ss-regex-Url')},
                    {exp: SimpleSchema.RegEx.Id,         msg: __('base-client-language-ss-regex-Id')},
                ],
                passwordMismatch:       __('base-client-language-ss-passwordMismatch'),
                emailExists:            __('base-client-language-ss-emailExists'),
                emailNotFound:          __('base-client-language-ss-emailNotFound'),
                passwordIncorrect:      __('base-client-language-ss-passwordIncorrect')
            });

        }).fail(function(error_message) {
            Partup.client.notify.error('Could not load the language "' + language + '"');
        });
    }

};
