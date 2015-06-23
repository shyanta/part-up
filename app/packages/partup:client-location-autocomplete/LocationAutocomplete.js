// jscs:disable
/**
 * Widget to render a location autocomplete input
 *
 * You can pass the widget a few options which enable various functionalities
 *
 * @param {String} placeholder              A string that will serve as placeholder for the input field
 * @param {Object} location                 The location object the autocomplete box should be prefilled with
 * @param {Function} placeSelectedCallback  A function that will be executed when an item in the dropdown was clicked, containing {placeId,city}
 * @param {Function} clearCallback          A function that will be executed the clear button is clicked
 */
// jscs:enable
//
Template.LocationAutocomplete.onCreated(function() {
    this.locationAutocompletes = new ReactiveVar([]);
    this.filledInValue = new ReactiveVar();
    this.dirty = new ReactiveVar(false);
});

Template.LocationAutocomplete.helpers({
    locationAutocompletes: function() {
        return Template.instance().locationAutocompletes.get();
    },
    filledInValue: function() {
        var template = Template.instance();
        var filledInValue = template.filledInValue.get();
        if (filledInValue) {
            return filledInValue;
        }
        var location = template.data.location;
        if (location && !template.dirty.get()) {
            return location.city;
        }

        return false;
    }
});

Template.LocationAutocomplete.events({
    'click [data-clear]': function(event, template) {
        template.dirty.set(true);
        template.filledInValue.set(undefined);
        if (template.data.clearCallback) {
            template.data.clearCallback();
        }
    },
    'keydown [data-locationautocomplete]': function(event, template) {
        var currentValue = $(event.currentTarget).val();
        Meteor.call('google.cities.autocomplete', currentValue, function(error, result) {
            template.locationAutocompletes.set(result);
        });
    },
    'click [data-place]': function(event, template) {
        template.filledInValue.set(this.city);
        template.data.placeSelectedCallback({
            placeId: this.id,
            city: this.city
        });
    }
});
