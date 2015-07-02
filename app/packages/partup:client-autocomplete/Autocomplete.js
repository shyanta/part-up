Template.Autocomplete.onRendered(function() {
    var tpl = this;

    // Autocomplete: find the input field
    var inputElement = tpl.find('input');

    // Autocomplete: on select, set the reactive var
    $(inputElement).on('typeahead:select', function(event, item) {
        if (tpl.data.onSelect) tpl.data.onSelect(item);
    });

    // Autocomplete: debounced Meteor.call for autocomplete results
    var autocomplete = lodash.debounce(function(query, sync, async) {
        if (tpl.data.onQuery) tpl.data.onQuery(query, sync, async);
    }, 250, {
        maxWait: 1000
    });

    // Autocomplete: initialize using Meteor.typeahead
    Meteor.typeahead(inputElement, function(query, sync, async) {
        autocomplete(query, sync, async);
    });
});
