Template.registerHelper("partupDatepickerOptions", function () {
    return {
        language: moment.locale(),
        format: moment.localeData().longDateFormat('L').toLowerCase()
    };
});