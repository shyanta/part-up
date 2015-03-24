Template.registerHelper('partupDateISO', function(date) {
    return moment(date).toISOString();
});

Template.registerHelper('partupDateActivity', function(date) {
    var RELATIVE_TIME_TRESHOLD = 12 * 60 * 60 * 1000; // 12 hours
    var mDate = moment(date);

    if(moment().diff(mDate) < RELATIVE_TIME_TRESHOLD)
        return mDate.fromNow(true);

    return mDate.format('H:mm');
});

// Moment customization
moment.locale('en', {
    relativeTime: {
        future: "in %s",
        past:   "%s ago",
        s:  "just now",
        m:  "1 min",
        mm: "%d min",
        h:  "1 hour",
        hh: "%d hours",
        d:  "1 day",
        dd: "%d days",
        M:  "1 month",
        MM: "%d months",
        y:  "1 year",
        yy: "%d years"
    }
});