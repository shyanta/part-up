/**
 * If you want to prefill values:
 * Use Partup.client.discover.setPrefill(key, value); before changing route
 * to Discover
 */

Template.app_discover_partups_filter.onCreated(function() {
    var template = this;
    var updateQuery = function() {
        for (key in Partup.client.discover.DEFAULT_QUERY) {
            var fieldValue          = Partup.client.discover.current_query[key];
            var defaultFieldValue   = Partup.client.discover.DEFAULT_QUERY[key];

            Partup.client.discover.query.set(key, fieldValue || defaultFieldValue);
        }
    };
    template.searchQuery = new ReactiveVar(undefined, function(a, b) {
        Partup.client.discover.current_query.textSearch = b || undefined;
        updateQuery();
    });
    template.selectedTribe = new ReactiveVar(undefined, function(a, b) {
        Partup.client.discover.current_query.networkId = (b && b._id) || undefined;
        updateQuery();
    });
    template.selectedLocation = new ReactiveVar(undefined, function(a, b) {
        Partup.client.discover.current_query.locationId = (b && b.id) || undefined;
        updateQuery();
    });
    template.locationHasValueVar = new ReactiveVar(undefined);
    template.selectedLanguage = new ReactiveVar(undefined, function(a, b) {
        Partup.client.discover.current_query.language = (b && b._id) || undefined;
        updateQuery();
    });
});
Template.app_discover_partups_filter.onDestroyed(function() {
    var template = this;

    Partup.client.discover.resetQuery();
});

Template.app_discover_partups_filter.helpers({
    state: function() {
        var template = Template.instance();

        return {
            selectedTribeReactiveVar: function() {
                return template.selectedTribe;
            },
            selectedLanguageReactiveVar: function() {
                return template.selectedLanguage;
            },
            selectedLocationReactiveVar: function() {
                return template.selectedLocation;
            },
            locationHasValueVar: function() {
                return template.locationHasValueVar;
            },
            locationFormvalue: function() {
                return function(location) {
                    return location.id;
                };
            },
            locationLabel: function() {
                return Partup.client.strings.locationToDescription;
            }
        };
    },
    data: function() {
        var template = Template.instance();

        return {
            networks: function() {
                return Networks.find();
            },
            languages: function() {
                return Languages.find();
            }
        };
    },
    hooks: function() {
        return {
            locationQuery: function() {
                return function(query, sync, async) {
                    Meteor.call('google.cities.autocomplete', query, function(error, locations) {
                        lodash.each(locations, function(loc) {
                            loc.value = Partup.client.strings.locationToDescription(loc);
                        });
                        async(locations);
                    });
                };
            },
        };
    }
});

Template.app_discover_partups_filter.events({
    'submit [data-form]': function(event, template) {
        event.preventDefault();
    },
    'input [data-search-query]': function(event, template) {
        template.searchQuery.set($(event.currentTarget).val());
    }
});
