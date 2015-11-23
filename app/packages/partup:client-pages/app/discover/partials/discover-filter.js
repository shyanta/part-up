/**
 * Please prefill values using Partup.client.discover.setPrefill(key, value); before changing route to Discover
 */

Template.app_discover_filter.onCreated(function() {
    var template = this;

    Partup.client.discover.prefillQuery();
    var customPrefill = Partup.client.discover.getCustomPrefill();

    var prefilledNetworkId = Partup.client.discover.query.get('networkId');
    template.selectedNetworkLabel = new ReactiveVar(
        prefilledNetworkId ? Networks.findOne(prefilledNetworkId) : undefined
    );
    template.networkBox = {
        state: new ReactiveVar(false),
        data: function() {
            var DROPDOWN_ANIMATION_DURATION = 200;

            return {
                onSelect: function(network) {
                    template.networkBox.state.set(false);

                    // Once the box is closed, set the value
                    Meteor.setTimeout(function() {
                        template.queryForm[0].elements.networkId.value = network._id;
                        template.queryForm.submit();
                        template.selectedNetworkLabel.set(network.name);
                    }, DROPDOWN_ANIMATION_DURATION);
                }
            };
        }
    };

    var prefilledLocationId = Partup.client.discover.query.get('locationId');
    template.selectedLocationLabel = new ReactiveVar(
        prefilledLocationId ? customPrefill.locationLabel : undefined
    );
    template.locationBox = {
        state: new ReactiveVar(false, function(a, isOpen) {
            if (!isOpen) return;

            // Focus the text box
            Meteor.defer(function() {
                var searchfield = template.find('form#locationSelector').elements.search;
                if (searchfield) searchfield.focus();
            });
        }),
        data: function() {
            var DROPDOWN_ANIMATION_DURATION = 200;

            return {
                onSelect: function(location) {
                    template.locationBox.state.set(false);

                    // Once the box is closed, set the value
                    Meteor.setTimeout(function() {
                        template.queryForm[0].elements.locationId.value = location.id;
                        template.queryForm.submit();
                        template.selectedLocationLabel.set(location.city);
                    }, DROPDOWN_ANIMATION_DURATION);
                }
            };
        }
    };

    var sortOptions = [
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
    var prefilledSortValue = Partup.client.discover.query.get('sort');
    var sortOption = lodash.find(sortOptions, {
        value: prefilledSortValue
    });
    template.selectedSortLabel = new ReactiveVar(sortOption.label());
    template.sortBox = {
        state: new ReactiveVar(false),
        data: function() {
            var DROPDOWN_ANIMATION_DURATION = 200;

            return {
                options: sortOptions,
                default: sortOption,
                onSelect: function(sort) {
                    template.sortBox.state.set(false);

                    // Once the box is closed, set the value
                    Meteor.setTimeout(function() {
                        template.queryForm[0].elements.sort.value = sort.value;
                        template.queryForm.submit();
                        template.selectedSortLabel.set(sort.label());
                    }, DROPDOWN_ANIMATION_DURATION);
                }
            };
        }
    };

    // // Sorting filter datamodel
    // var sortingOptions = [
    //     {
    //         value: 'popular',
    //         label: function() {
    //             return __('pages-app-discover-filter-sorting-type-popular');
    //         }
    //     },
    //     {
    //         value: 'new',
    //         label: function() {
    //             return __('pages-app-discover-filter-sorting-type-newest');
    //         }
    //     }
    // ];
    // var defaultSortingOption = lodash.find(sortingOptions, {value: Partup.client.discover.DEFAULT_QUERY.sort});
    // tpl.sorting = {
    //     options: sortingOptions,
    //     value: new ReactiveVar(defaultSortingOption),
    //     selectorState: new ReactiveVar(false),
    //     selectorData: function() {
    //         var DROPDOWN_ANIMATION_DURATION = 200;

    //         return {
    //             onSelect: function(sorting) {
    //                 tpl.sorting.selectorState.set(false);

    //                 Meteor.setTimeout(function() {
    //                     tpl.sorting.value.set(sorting);
    //                     tpl.submitFilterForm();
    //                 }, DROPDOWN_ANIMATION_DURATION);
    //             },
    //             options: tpl.sorting.options,
    //             default: defaultSortingOption.value
    //         };
    //     },
    // };

    // tpl.language = {
    //     value: new ReactiveVar(Partup.client.discover.DEFAULT_QUERY.language),
    //     selectorState: new ReactiveVar(false, function(a, b) {
    //         if (!b) return;
    //     }),
    //     selectorData: function() {
    //         var DROPDOWN_ANIMATION_DURATION = 200;

    //         return {
    //             onSelect: function(language) {
    //                 tpl.language.selectorState.set(false);

    //                 Meteor.setTimeout(function() {
    //                     tpl.language.value.set(language);
    //                     tpl.submitFilterForm();
    //                 }, DROPDOWN_ANIMATION_DURATION);
    //             }
    //         };
    //     }
    // };
});

Template.app_discover_filter.onRendered(function() {
    var template = this;

    template.queryForm = template.$('form#discoverQueryForm');

    // // Submit filter form once
    // tpl.submitFilterForm();

    // // Blur all input fields when user is submitting
    // tpl.autorun(function() {
    //     if (tpl.data.getting_data.get()) {
    //         tpl.$('input').blur();
    //     }
    // });

    var dropdown_element = template.find('[data-filterbar]');
    template.handler = Partup.client.elements.onClickOutside([dropdown_element], function() {
        template.networkBox.state.set(false);
    });
});

Template.app_discover_filter.onDestroyed(function() {
    var template = this;

    Partup.client.discover.resetQuery();
    Partup.client.elements.offClickOutside(template.handler);
});

Template.app_discover_filter.helpers({
    query: function(key) {
        return Partup.client.discover.query.get(key);
    },
    selectedNetworkLabel: function() {
        return Template.instance().selectedNetworkLabel.get();
    },
    networkBox: function() {
        return Template.instance().networkBox;
    },
    selectedLocationLabel: function() {
        return Template.instance().selectedLocationLabel.get();
    },
    locationBox: function() {
        return Template.instance().locationBox;
    },
    selectedSortLabel: function() {
        return Template.instance().selectedSortLabel.get();
    },
    sortBox: function() {
        return Template.instance().sortBox;
    }
    // Query
    // textsearchData: function() {
    //     return Template.instance().textsearch.value.get() || '';
    // },

    // Network
    // networkValue: function() {
    //     return Template.instance().network.value.get();
    // },
    // networkSelectorState: function() {
    //     return Template.instance().network.selectorState;
    // },
    // networkSelectorData: function() {
    //     return Template.instance().network.selectorData;
    // },

    // Location
    // locationValue: function() {
    //     return Template.instance().location.value.get();
    // },
    // locationSelectorState: function() {
    //     return Template.instance().location.selectorState;
    // },
    // locationSelectorData: function() {
    //     return Template.instance().location.selectorData;
    // },

    // Sorting
    // sortingValue: function() {
    //     return Template.instance().sorting.value.get();
    // },
    // sortingSelectorState: function() {
    //     return Template.instance().sorting.selectorState;
    // },
    // sortingSelectorData: function() {
    //     return Template.instance().sorting.selectorData;
    // },

    // Language
    // languageValue: function() {
    //     return Template.instance().language.value.get();
    // },
    // languageSelectorState: function() {
    //     return Template.instance().language.selectorState;
    // },
    // languageSelectorData: function() {
    //     return Template.instance().language.selectorData;
    // },
});
// var toggleSelectorState = function(template, selector) {
//     if (selector) {
//         if (template[selector] !== template.sorting) template.sorting.selectorState.set(false);
//         if (template[selector] !== template.language) template.language.selectorState.set(false);
//         if (template[selector] !== template.network) template.network.selectorState.set(false);
//         if (template[selector] !== template.location) template.location.selectorState.set(false);
//         var currentState = template[selector].selectorState.get();
//         template[selector].selectorState.set(!currentState);
//     } else {
//         template.sorting.selectorState.set(false);
//         template.language.selectorState.set(false);
//         template.network.selectorState.set(false);
//         template.location.selectorState.set(false);
//     }
// };

Template.app_discover_filter.events({
    'submit form#discoverQueryForm': function(event, template) {
        event.preventDefault();

        var form = event.currentTarget;

        for (key in Partup.client.discover.DEFAULT_QUERY) {
            if (!form.elements[key]) {
                continue;
            }

            var formValue = form.elements[key].value;
            var defaultValue = Partup.client.discover.DEFAULT_QUERY[key];

            Partup.client.discover.query.set(key, formValue || defaultValue);
        }

        window.scrollTo(0, 0);
    },

    // Textsearch field
    'click [data-reset-textsearch]': function(event, template) {
        event.preventDefault();
        template.queryForm[0].elements.textSearch.value = '';
        template.queryForm.submit();
    },

    // Network field
    'click [data-open-networkbox]': function(event, template) {
        event.preventDefault();
        template.networkBox.state.set(true);
    },
    'click [data-reset-networkid]': function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        template.networkBox.state.set(false);
        template.selectedNetworkLabel.set();
        template.queryForm[0].elements.networkId.value = '';
        template.queryForm.submit();
    },

    // Location field
    'click [data-open-locationbox]': function(event, template) {
        event.preventDefault();
        template.locationBox.state.set(true);
    },
    'click [data-reset-locationid]': function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        template.locationBox.state.set(false);
        template.selectedLocationLabel.set();
        template.queryForm[0].elements.locationId.value = '';
        template.queryForm.submit();
    },

    // Sort field
    'click [data-open-sortbox]': function(event, template) {
        event.preventDefault();
        template.sortBox.state.set(true);
    },
    'click [data-reset-sortid]': function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        template.sortBox.state.set(false);
        template.selectedSortLabel.set();
        template.queryForm[0].elements.sortId.value = '';
        template.queryForm.submit();
    }

    // 'keyup [data-textsearch-input]': function(e, template) {
    //     e.preventDefault();
    //     var value = $(e.currentTarget).val();
    //     template.textsearch.value.set(value);

    //     if (window.PU_IE_VERSION === -1) return;
    //     // IE fix (return key submit)
    //     var pressedKey = e.which ? e.which : e.keyCode;
    //     if (pressedKey == 13) {
    //         template.submitFilterForm();
    //         return false;
    //     }
    // },

    // // Network selector events
    // 'click [data-open-networkselector]': function(event, template) {
    //     event.preventDefault();
    //     toggleSelectorState(template, 'network');
    // },

    // // Location selector events
    // 'click [data-open-locationselector]': function(event, template) {
    //     event.preventDefault();
    //     toggleSelectorState(template, 'location');
    // },
    // 'click [data-reset-selected-location]': function(event, template) {
    //     event.preventDefault();
    //     template.location.value.set('');
    //     template.submitFilterForm();
    // },

    // // Sorting selector events
    // 'click [data-open-sortingselector]': function(event, template) {
    //     event.preventDefault();
    //     toggleSelectorState(template, 'sorting');
    // },

    // // Language selector events
    // 'click [data-open-languageselector]': function(event, template) {
    //     event.preventDefault();
    //     toggleSelectorState(template, 'language');
    // },
    // 'click [data-reset-selected-language]': function(event, template) {
    //     event.preventDefault();
    //     template.language.value.set('');
    //     template.submitFilterForm();
    // },
});
