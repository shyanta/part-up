Template.DropdownTribes.onCreated(function() {
    var template = this;

    // Current user
    var user = Meteor.user();

    // Placeholder for states (such as loading states)
    template.states = {
        loadingNetworks: new ReactiveVar(false)
    };

    // Placeholder for results
    template.results = {
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
});
Template.DropdownTribes.onRendered(function() {
    var template = this;
    ClientDropdowns.addOutsideDropdownClickHandler(template, '[data-clickoutside-close]', '[data-toggle-menu=menu]');
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
    'click [data-toggle-menu]': ClientDropdowns.dropdownClickHandler
});

Template.DropdownTribes.helpers({
    menuOpen: function() {
        return Template.instance().dropdownOpen.get();
    },
    networks: function() {
        return Template.instance().results.networks.get();
    }
});
