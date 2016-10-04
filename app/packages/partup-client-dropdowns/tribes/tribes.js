var sortPartups = function(partups, user) {
    return lodash.sortByOrder(partups, function(partup) {
        var upper_data = lodash.find(partup.upper_data, '_id', user._id);
        if (upper_data && upper_data.new_updates) {
            return upper_data.new_updates.length;
        } else {
            return 0;
        }
    }, ['desc']);
};
Template.DropdownTribes.onCreated(function() {
    var template = this;

    // Current user
    var user = Meteor.user();

    // Placeholder for states (such as loading states)
    template.states = {
        loadingUpperpartups: new ReactiveVar(false),
        loadingSupporterpartups: new ReactiveVar(false),
        loadingNetworks: new ReactiveVar(false)
    };

    // Placeholder for results
    template.results = {
        upperpartups: new ReactiveVar([]),
        supporterpartups: new ReactiveVar([]),
        networks: new ReactiveVar([])
    };

    var query = {
        token: Accounts._storedLoginToken(),
        archived: false
    };

    template.dropdownOpen = new ReactiveVar(false, function(a, hasBeenOpened) {
        if (!hasBeenOpened) return;
        // (Re)load networks
        template.states.loadingNetworks.set(true);
        HTTP.get('/users/' + user._id + '/networks' + mout.queryString.encode(query), function(error, response) {
            if (error || !response.data.networks || response.data.networks.length === 0) {
                template.states.loadingNetworks.set(false);
                return;
            }

            var result = response.data;

            template.results.networks.set(result.networks.map(function(network) {
                Partup.client.embed.network(network, result['cfs.images.filerecord'], result.users);

                return network;
            }).sort(Partup.client.sort.alphabeticallyASC.bind(null, 'name')));
        });
    });

    template.activeTribe = new ReactiveVar(undefined, function(a, tribeId) {
        if (!tribeId) return;
        console.log(tribeId)
        // (Re)load upper partups
        template.states.loadingUpperpartups.set(true);
        HTTP.get('/users/' + user._id + '/upperpartups' + mout.queryString.encode(query), function(error, response) {
            if (error || !response.data.partups || response.data.partups.length === 0) {
                template.states.loadingUpperpartups.set(false);
                return;
            }

            var result = response.data;

            template.results.upperpartups.set(result.partups.map(function(partup) {
                Partup.client.embed.partup(partup, result['cfs.images.filerecord'], result.networks, result.users);

                return partup;
            }).filter(function(item) {
                return item.network_id === tribeId;
            }));
        });

        // (Re)load supporter partups
        template.states.loadingSupporterpartups.set(true);
        HTTP.get('/users/' + user._id + '/supporterpartups' + mout.queryString.encode(query), function(error, response) {
            if (error || !response.data.partups || response.data.partups.length === 0) {
                template.states.loadingSupporterpartups.set(false);
                return;
            }

            var result = response.data;

            template.results.supporterpartups.set(result.partups.map(function(partup) {
                Partup.client.embed.partup(partup, result['cfs.images.filerecord'], result.networks, result.users);

                return partup;
            }).filter(function(item) {
                return item.network_id === tribeId;
            }));
        });
    });
});
Template.DropdownTribes.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu=tribes]');
    Router.onBeforeAction(function(req, res, next) {
        template.dropdownOpen.set(false);
        next();
    });
});

Template.DropdownTribes.onDestroyed(function() {
    var template = this;
    ClientDropdowns.removeOutsideDropdownClickHandler(template);
});

Template.DropdownTribes.events({
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation,
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler,
    'mouseover [data-hover]': function(event, template) {
        template.activeTribe.set($(event.currentTarget).data('hover'));
    }
});

Template.DropdownTribes.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    networks: function() {
        return Template.instance().results.networks.get();
    },
    upperPartups: function() {
        var user = Meteor.user();
        if (!user) return [];

        var allPartups = Template.instance().results.upperpartups.get();

        return sortPartups(allPartups, user);
    },

    supporterPartups: function() {
        var user = Meteor.user();
        if (!user) return [];

        var allPartups = Template.instance().results.supporterpartups.get();

        return sortPartups(allPartups, user);
    },

    newUpdates: function() {
        if (!this.upper_data) return;
        var count = null;
        this.upper_data.forEach(function(upperData) {
            if (upperData._id === Meteor.userId()) {
                count = upperData.new_updates.length;
            }
        });
        return count;
    }
});
