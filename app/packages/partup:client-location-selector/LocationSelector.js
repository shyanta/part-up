var STUB_LOCATIONS = [
    {
        id: '1',
        city: 'Amsterdam'
    },
    {
        id: '2',
        city: 'Rotterdam'
    },
    {
        id: '3',
        city: 'Den Haag'
    }
];

Template.LocationSelector.onCreated(function() {
    var tpl = this;

    // When the value changes, notify the parent using the onSelect callback
    this.currentLocation = new ReactiveVar(false, function(a, location) {
        if (!location) return;

        if (tpl.data.onSelect) tpl.data.onSelect(location);
    });
});

Template.LocationSelector.onRendered(function() {
    var tpl = this;

    // Reset the form when the LocationSelector closes
    var form = tpl.find('form');
    tpl.autorun(function() {
        var activeVar = Template.currentData().isActive;
        if (!activeVar) return;

        if (!activeVar.get()) {
            form.reset();
        }
    });

});

Template.LocationSelector.helpers({
    currentLocation: function() {
        return Template.instance().currentLocation.get();
    },
    suggestedLocations: function() {

        // STUB
        return STUB_LOCATIONS;

        // todo: real call
    },

    onAutocompleteQuery: function() {
        return function(query, sync, async) {
            Meteor.call('google.cities.autocomplete', query, function(error, locations) {
                lodash.each(locations, function(l) {
                    l.value = l.city; // what to show in the autocomplete list
                });
                async(locations);
            });
        };
    },
    onAutocompleteSelect: function() {
        var tpl = Template.instance();

        return function(location) {
            tpl.currentLocation.set(location);
        };
    },
});

Template.LocationSelector.events({
    'click [data-select-suggested-location]': function(event, template) {
        var placeId = event.currentTarget.getAttribute('data-select-suggested-location');
        Meteor.call('google.cities.byPlaceId', placeId, function(error, location) {
            template.currentLocation.set(location);
        });
    },
    'submit form': function(event) {
        event.preventDefault();
    }
});
