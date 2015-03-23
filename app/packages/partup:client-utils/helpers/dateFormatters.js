Template.registerHelper('readableDate', function(timestamp) {
    return moment(new Date(timestamp), 'DD MMMM YYY');
});
