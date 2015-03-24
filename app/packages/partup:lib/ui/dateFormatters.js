Template.registerHelper('partupDateISO', function(date) {
    return moment(date).toISOString();
});

Template.registerHelper('partupDatePartupActivity', function(date) {
    var RELATIVE_TIME_TRESHOLD = 12 * 60 * 60 * 1000; // 12 hours
    var mDate = moment(date);

    mDate.locale(TAPi18n.getLanguage(), {
        relativeTime: {
            s:  TAPi18n.__('date-format-partup-activity-s'),
            m:  TAPi18n.__('date-format-partup-activity-m'),
            mm:  TAPi18n.__('date-format-partup-activity-mm'),
            h:  TAPi18n.__('date-format-partup-activity-h'),
            hh:  TAPi18n.__('date-format-partup-activity-hh')
        }
    });

    if(moment().diff(mDate) < RELATIVE_TIME_TRESHOLD)
        return mDate.fromNow(true);

    return mDate.format('LT');
});

Template.registerHelper('partupDatePartupTimeline', function(date) {
    var RELATIVE_TIME_TRESHOLD = 7 * 24 * 60 * 60 * 1000; // 1 week
    var mDate = moment(date);

    mDate.locale(TAPi18n.getLanguage(), {
        relativeTime: {
            d:  TAPi18n.__('date-format-partup-timeline-d'),
            dd:  TAPi18n.__('date-format-partup-timeline-dd')
        }
    });

    if(moment().diff(mDate) < RELATIVE_TIME_TRESHOLD)
        return mDate.fromNow(true);

    return mDate.format('LL');
});