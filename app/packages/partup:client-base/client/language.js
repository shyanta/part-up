/**
 * All language related functionality
 *
 * @class language
 * @memberof Partup.client
 */
// jscs:disable
Partup.client.language = {
    current: new ReactiveVar(),
    /**
     * Set the language of partup
     *
     * @memberof Partup.client.language
     * @param {String} language
     */
    change: function(language) {
        var self = this;

        // prevent unnessesary language changes
        var currentLanguage = Partup.client.language.current.get();
        if(language === currentLanguage) return;

        TAPi18n.setLanguage(language).done(function() {
            // Change MomentJS language
            moment.locale(language);
            Partup.client.language.current.set(language);
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
                individualMaxString: __('base-client-language-ss-individualMaxString'),
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
                    {exp: Partup.services.validators.email,  msg: __('base-client-language-ss-regex-Email')},
                    {exp: SimpleSchema.RegEx.Domain,         msg: __('base-client-language-ss-regex-Domain')},
                    {exp: SimpleSchema.RegEx.WeakDomain,     msg: __('base-client-language-ss-regex-WeakDomain')},
                    {exp: SimpleSchema.RegEx.IP,             msg: __('base-client-language-ss-regex-IP')},
                    {exp: SimpleSchema.RegEx.IPv4,           msg: __('base-client-language-ss-regex-IPv4')},
                    {exp: SimpleSchema.RegEx.IPv6,           msg: __('base-client-language-ss-regex-IPv6')},
                    {exp: SimpleSchema.RegEx.Url,            msg: __('base-client-language-ss-regex-Url')},
                    {exp: SimpleSchema.RegEx.Id,             msg: __('base-client-language-ss-regex-Id')},
                ],
                passwordMismatch:       __('base-client-language-ss-passwordMismatch'),
                emailExists:            __('base-client-language-ss-emailExists'),
                emailNotFound:          __('base-client-language-ss-emailNotFound'),
                passwordIncorrect:      __('base-client-language-ss-passwordIncorrect')
            });
            var user = Meteor.user();
            if(!user) return;
            // update the user stored language setting for future logins
            Meteor.call('settings.update', {locale: language}, function(err) {
                if (err) {
                    Partup.client.notify.error('Could not set the correct language');
                    return;
                }
            });

        }).fail(function(error_message) {
            Partup.client.notify.error('Could not load the language "' + language + '"');
        });
    },

    /**
     * Sets the language of partup to the default settings (browser settings)
     *
     * @memberof Partup.client.language
     */
    setToDefault: function() {
            var language = Partup.client.language.getDefault();
            Partup.client.language.change(language);
    },

    getDefault: function() {
        var language = 'en';
        if (TAPi18n && Partup) {
            var detectedLocale = navigator.language || navigator.userLanguage;    // value is like: en-US
            if (detectedLocale && detectedLocale.match(/^[a-z]{2}-[a-z]{2}$/i)) {  // if the value matches 'xx-xx'
                detectedLocale = detectedLocale.split('-')[0];                    // value is like: en
            }
            language = detectedLocale || 'en';
        }
        return language;
    }

};
// jscs:enable
