Template.registerHelper('partupEquals', function(a, b) {
    return (a == b);
});

Template.registerHelper('partupEqualsExactly', function(a, b) {
    return (a === b);
});

Template.registerHelper('partupNotEquals', function(a, b) {
    return (a != b);
});

Template.registerHelper('partupNotEqualsExactly', function(a, b) {
    return (a !== b);
});

Template.registerHelper('partupHasTrueValues', function(object) {
    var empty = false;
    _.each(object, function(value) {
        if (value) empty = true;
    });
    return empty
});

Template.registerHelper('partupHigherThan', function(a, b) {
    return (a > b);
});

Template.registerHelper('partupLowerThan', function(a, b) {
    return (a < b);
});

Template.registerHelper('partupContains', function(a, b) {
    return a.indexOf(b) > -1;
});

Template.registerHelper('partupContainsOne', function(a, b) {
    var contains = false;
    for (var i = 1; i < arguments.length; i++) {
        if (a.indexOf(arguments[i]) > -1) {
            contains = true;
        }
    };
    return contains;
});
