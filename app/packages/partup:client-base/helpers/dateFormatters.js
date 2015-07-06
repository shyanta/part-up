/*************************************************************/
/* Function to provide a temporarely customized locale Moment
/*
/*   Inside the callback, the moment() will be locally customized as provided.
/*   After the callback, everything is back to normal again.
/*   The callback will be called synchronously.
/*************************************************************/
var localCustomizedMoment = function localCustomizedMoment (language, customizations, synchronous_callback) {

    // Save current locale data
    var localeData = moment.localeData();
    var savedCustomizations = {};
    _.each(customizations, function(customization, key) {
        savedCustomizations[key] = localeData['_' + key];
    });

    // Customize moment
    moment.locale(language, customizations);

    // Execute the synchronous callback
    synchronous_callback();

    // Reset to previously saved locale data
    moment.locale(language, savedCustomizations);

};

/*************************************************************/
/* Global date formatter helpers */
/*************************************************************/
Template.registerHelper('partupDateNormal', function(date) {
    return moment(date).format('LL');
});

Template.registerHelper('partupDateFull', function(date) {
    return moment(date).format('LLL');
});

Template.registerHelper('partupDateCustom', function(date, format) {
    return moment(date).format(format);
});

Template.registerHelper('partupDateISO', function(date) {
    return moment(date).toISOString();
});

Template.registerHelper('partupDatePartupActivity', function(date) {
    var RELATIVE_TIME_TRESHOLD = 24 * 60 * 60 * 1000; // 24 hours
    var mDate = moment(date);

    var now = moment(Partup.client.reactiveDate());
    if (now.diff(mDate) < RELATIVE_TIME_TRESHOLD) {
        var language = TAPi18n.getLanguage();
        mDate.locale(language);
        var output = '';
        localCustomizedMoment(language, {
            relativeTime: {
                s:  __('base-helpers-dateFormatters-difference-time-s'),
                m:  __('base-helpers-dateFormatters-difference-time-m'),
                mm:  __('base-helpers-dateFormatters-difference-time-mm'),
                h:  __('base-helpers-dateFormatters-difference-time-h'),
                hh:  __('base-helpers-dateFormatters-difference-time-hh')
            }
        }, function() {
            output = mDate.fromNow(true);
        });
        return output;
    }

    return mDate.format('LT');
});

Template.registerHelper('partupDateComment', function(date) {
    var RELATIVE_TIME_TRESHOLD = 24 * 60 * 60 * 1000; // 24 hours

    // Moment dates
    var mDate = moment(date);
    var mNow = moment(Partup.client.reactiveDate());

    // If the time is under the Relative Time Treshold...
    if (mNow.diff(mDate) < RELATIVE_TIME_TRESHOLD) {
        var language = TAPi18n.getLanguage();
        mDate.locale(language);
        var output = '';
        localCustomizedMoment(language, {
            relativeTime: {
                s:  __('base-helpers-dateFormatters-difference-time-s'),
                m:  __('base-helpers-dateFormatters-difference-time-m'),
                mm:  __('base-helpers-dateFormatters-difference-time-mm'),
                h:  __('base-helpers-dateFormatters-difference-time-h'),
                hh:  __('base-helpers-dateFormatters-difference-time-hh')
            }
        }, function() {
            output = mDate.fromNow(true);
        });
        return output;
    }

    // If the time is in the same year
    if (mDate.year() === mNow.year()) {
        return mDate.format(__('base-helpers-dateFormatters-format-sameyear'));
    }

    // Default
    return mDate.format(__('base-helpers-dateFormatters-format-anotheryear'));
});

Template.registerHelper('partupDatePartupTimeline', function(date) {
    var RELATIVE_TIME_TRESHOLD = 7 * 24 * 60 * 60 * 1000; // 1 week
    var mDate = moment(date);

    if (moment().diff(mDate) < RELATIVE_TIME_TRESHOLD) {
        var lang = TAPi18n.getLanguage();
        mDate.locale(lang);
        var output = '';
        localCustomizedMoment(lang, {
            relativeTime: {
                d:  __('base-helpers-dateFormatters-difference-days-d'),
                dd:  __('base-helpers-dateFormatters-difference-days-dd')
            }
        }, function() {
            output = mDate.fromNow(true);
        });
        return output;
    }

    return mDate.format('LL');
});
