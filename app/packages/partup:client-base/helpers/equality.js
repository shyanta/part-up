Template.registerHelper("partupEquals", function (a, b) {
    return (a == b);
});

Template.registerHelper("partupEqualsExactly", function (a, b) {
    return (a === b);
});

Template.registerHelper("partupNotEquals", function (a, b) {
    return (a != b);
});

Template.registerHelper("partupNotEqualsExactly", function (a, b) {
    return (a !== b);
});

Template.registerHelper("partupHasTrueValues", function (object) {
    var empty = false;
    _.each(object, function(value){
        if(value) empty = true;
    });
    return empty
});