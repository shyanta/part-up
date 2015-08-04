/**
 * Header of the Discover page
 * This template handles the search, filtering and sorting options for the discover page
 *
 * @param query {ReactiveVar} - The placeholder reactive-var for the query options
 */

/**
 * Discover-header created
 */
Template.app_discover_filter.onCreated(function() {
    var tpl = this;

    // Submit filter form
    tpl.submitFilterForm = function() {
        Meteor.defer(function() {
            var form = tpl.find('form#discoverQuery');
            $(form).submit();
        });
    };

    // Textsearch
    tpl.textsearch = {
        value: new ReactiveVar()
    };

    // Network filter datamodel
    tpl.network = {
        value: new ReactiveVar(),
        selectorState: new ReactiveVar(false, function(a, b) {
            if (!b) return;

            // Focus the searchfield
            Meteor.defer(function() {
                var searchfield = tpl.find('form#networkSelector').elements.search;
                if (searchfield) searchfield.focus();
            });
        }),
        selectorData: function() {
            var DROPDOWN_ANIMATION_DURATION = 200;

            return {
                onSelect: function(networkId) {
                    tpl.network.selectorState.set(false);

                    Meteor.setTimeout(function() {
                        tpl.network.value.set(networkId);
                        tpl.submitFilterForm();
                    }, DROPDOWN_ANIMATION_DURATION);
                }
            };
        }
    };

    // Location filter datamodel
    tpl.location = {
        value: new ReactiveVar(),
        selectorState: new ReactiveVar(false, function(a, b) {
            if (!b) return;

            // Focus the searchfield
            Meteor.defer(function() {
                var searchfield = tpl.find('form#locationSelector').elements.search;
                if (searchfield) searchfield.focus();
            });
        }),
        selectorData: function() {
            var DROPDOWN_ANIMATION_DURATION = 200;

            return {
                onSelect: function(location) {
                    tpl.location.selectorState.set(false);

                    Meteor.setTimeout(function() {
                        tpl.location.value.set(location);
                        tpl.submitFilterForm();
                    }, DROPDOWN_ANIMATION_DURATION);
                }
            };
        }
    };

    // Sorting filter datamodel
    var sortingOptions = [
        {
            value: 'popular',
            label: function() {
                return __('pages-app-discover-filter-sorting-type-popular');
            }
        },
        {
            value: 'new',
            label: function() {
                return __('pages-app-discover-filter-sorting-type-newest');
            }
        }
    ];
    var defaultSortingOption = sortingOptions[1]; // 'new'
    tpl.sorting = {
        options: sortingOptions,
        value: new ReactiveVar(defaultSortingOption),
        selectorState: new ReactiveVar(false),
        selectorData: function() {
            var DROPDOWN_ANIMATION_DURATION = 200;

            return {
                onSelect: function(sorting) {
                    tpl.sorting.selectorState.set(false);

                    Meteor.setTimeout(function() {
                        tpl.sorting.value.set(sorting);
                        tpl.submitFilterForm();
                    }, DROPDOWN_ANIMATION_DURATION);
                },
                options: tpl.sorting.options,
                default: defaultSortingOption.value
            };
        },
    };

    tpl.autorun(function(computation) {
        var queryValue = Session.get('discover.query.textsearch');
        if (queryValue) {
            Session.set('discover.query.textsearch', undefined);
            tpl.query.value.set(queryValue);
        }

        var locationValue = Session.get('discover.query.location');
        if (locationValue) {
            Session.set('discover.query.location', undefined);
            if (locationValue.place_id) locationValue.id = locationValue.place_id;
            tpl.location.value.set(locationValue);
        }

        if (!computation.firstRun) {
            tpl.submitFilterForm();
        }
    });
});

/**
 * Discover-header rendered
 */
Template.app_discover_filter.onRendered(function() {

    // Submit filter form once
    this.submitFilterForm();

});

/**
 * Discover-header helpers
 */
Template.app_discover_filter.helpers({
    // Query
    textsearchData: function() {
        return Template.instance().textsearch.value.get() || '';
    },

    // Network
    networkValue: function() {
        return Template.instance().network.value.get();
    },
    networkSelectorState: function() {
        return Template.instance().network.selectorState;
    },
    networkSelectorData: function() {
        return Template.instance().network.selectorData;
    },

    // Location
    locationValue: function() {
        return Template.instance().location.value.get();
    },
    locationSelectorState: function() {
        return Template.instance().location.selectorState;
    },
    locationSelectorData: function() {
        return Template.instance().location.selectorData;
    },

    // Sorting
    sortingValue: function() {
        return Template.instance().sorting.value.get();
    },
    sortingSelectorState: function() {
        return Template.instance().sorting.selectorState;
    },
    sortingSelectorData: function() {
        return Template.instance().sorting.selectorData;
    },
});

/**
 * Discover-header events
 */
Template.app_discover_filter.events({
    'submit form#discoverQuery': function(event, template) {
        event.preventDefault();

        var form = event.currentTarget;

        template.data.query.set({
            textSearch: form.elements.textsearch.value || undefined,
            networkId: form.elements.network_id.value || undefined,
            locationId: form.elements.location_id.value || undefined,
            sort: form.elements.sorting.value || undefined
        });

        window.scrollTo(0, 0);
    },

    'click [data-reset-textsearch]': function(event, template) {
        event.stopPropagation();
        template.textsearch.value.set('');
        template.submitFilterForm();
    },

    'input [data-textsearch-input]': function(event, template) {
        event.stopPropagation();
        var value = $(event.currentTarget).val();
        template.textsearch.value.set(value);
    },

    // Network selector events
    'click [data-open-networkselector]': function(event, template) {
        var current = template.network.selectorState.get();
        template.network.selectorState.set(!current);
    },
    'click [data-reset-selected-network]': function(event, template) {
        event.stopPropagation();
        template.network.value.set('');
        template.submitFilterForm();
    },

    // Location selector events
    'click [data-open-locationselector]': function(event, template) {
        var current = template.location.selectorState.get();
        template.location.selectorState.set(!current);
    },
    'click [data-reset-selected-location]': function(event, template) {
        event.stopPropagation();
        template.location.value.set('');
        template.submitFilterForm();
    },

    // Sorting selector events
    'click [data-open-sortingselector]': function(event, template) {
        var current = template.sorting.selectorState.get();
        template.sorting.selectorState.set(!current);
    }
});
