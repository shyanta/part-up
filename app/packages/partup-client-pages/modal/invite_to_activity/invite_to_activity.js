Template.modal_invite_to_activity.onCreated(function() {
    var template = this;
    var partupId = template.data.partupId;
    var activityId = template.data.activityId;
    var currentQuery = '';

    template.userIds = new ReactiveVar([]);
    template.loading = new ReactiveVar(true);

    template.states = {
        loading_infinite_scroll: false,
        paging_end_reached: new ReactiveVar(false)
    };
    var PAGING_INCREMENT = 10;
    template.searchQuery = new ReactiveVar(undefined, function(prevQuery, query) {
        currentQuery = query;
        if (prevQuery !== query) {
            template.userIds.set([]);
            template.states.paging_end_reached.set(false);
            template.states.loading_infinite_scroll = false;
            _.defer(function() { template.page.set(0); });
        }
    });

    template.subscribe('partups.one', partupId, function() {
        var partup = Partups.findOne(partupId);
        var networks = template.networks.get();
        var network = lodash.find(networks, {_id: partup.network_id || undefined});
        template.selectedNetwork.set(network ? network.slug : 'all');
    });
    template.subscribe('activities.from_partup', partupId);

    template.networks = new ReactiveVar([]);
    var user = Meteor.user();
    var query = {
        token: Accounts._storedLoginToken(),
        archived: false
    };

    HTTP.get('/users/' + user._id + '/networks' + mout.queryString.encode(query), function(error, response) {
        if (error || !response.data.networks || response.data.networks.length === 0) return;

        var result = response.data;

        template.networks.set(result.networks.map(function(network) {
            Partup.client.embed.network(network, result['cfs.images.filerecord'], result.users);

            return network;
        }).sort(Partup.client.sort.alphabeticallyASC.bind(null, 'name')));
    });

    // Submit filter form
    template.submitFilterForm = function() {
        Meteor.defer(function() {
            var form = template.find('form#suggestionsQuery');
            $(form).submit();
        });
    };

    template.selectedNetwork = new ReactiveVar('all', function(prev, curr) {
        if (prev !== curr) {
            template.userIds.set([]);
            template.states.paging_end_reached.set(false);
            template.states.loading_infinite_scroll = false;
            _.defer(function() { template.page.set(0); });
        }
    });

    template.callIteration = 0;

    template.page = new ReactiveVar(false, function(previousPage, page) {
        var query = template.searchQuery.get() || '';
        var options = {
            query: query,
            limit: PAGING_INCREMENT,
            skip: page * PAGING_INCREMENT,
            network: template.selectedNetwork.curValue === 'all' ? undefined : template.selectedNetwork.curValue
        };
        template.loading.set(true);
        // this meteor call still needs to be created
        template.callIteration++;
        var currentCallIteration = template.callIteration;
        Meteor.call('activities.user_suggestions', activityId, options, function(error, userIds) {
            if (query !== currentQuery) return;
            if (currentCallIteration !== template.callIteration) return;
            template.loading.set(false);
            if (error) {
                return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
            }
            if (!userIds || userIds.length === 0) {
                template.states.loading_infinite_scroll = false;
                template.states.paging_end_reached.set(true);
                return;
            }

            template.states.paging_end_reached.set(userIds.length < PAGING_INCREMENT);

            var existingUserIds = template.userIds.get();
            var newUserIds = existingUserIds.concat(userIds);
            template.userIds.set(newUserIds);

            template.states.loading_infinite_scroll = false;
        });
    });
    template.page.set(0);
});

Template.modal_invite_to_activity.helpers({
    data: function() {
        var template = Template.instance();
        return {
            suggestionIds: function() {
                return template.userIds.get();
            },
            textsearch: function() {
                return template.searchQuery.get() || '';
            },
            partupId: function() {
                return template.data.partupId;
            },
            activityId: function() {
                return template.data.activityId;
            },
            userTribes: function() {
                return template.networks.get();
            },
            partup: function() {
                return Partups.findOne(template.data.partupId);
            }
        };
    },
    state: function() {
        var template = Template.instance();
        return {
            loading: function() {
                return template.loading.get();
            }
        };
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_invite_to_activity.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        var partupId = template.data.partupId;
        var partup = Partups.findOne({_id: partupId});

        Intent.return('partup-activity-invite', {
            fallback_route: {
                name: 'partup',
                params: {
                    slug: partup.slug
                }
            }
        });
    },
    'change [data-filter-tribe]': function(event, template) {
        template.selectedNetwork.set(event.currentTarget.value);
        template.submitFilterForm();
    },
    'submit form#suggestionsQuery': function(event, template) {
        event.preventDefault();
        var form = event.currentTarget;
        template.searchQuery.set(form.elements.search_query.value);
    },
    'click [data-reset-search-query-input]': function(event, template) {
        event.preventDefault();
        $('[data-search-query-input]').val('');
        template.submitFilterForm();
    },

    'keyup [data-search-query-input]': function(e, template) {
        template.submitFilterForm();
    }
});
