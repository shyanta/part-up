Template.registerHelper("partupEquals", function (a, b) {
    return (a == b);
});

Template.registerHelper("partupEqualsExactly", function (a, b) {
    return (a === b);
});