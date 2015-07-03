Template.NetworkSelector.onCreated(function() {
    var tpl = this;

    // When the value changes, notify the parent using the onSelect callback
    tpl.currentNetwork = new ReactiveVar(false, function(a, network) {
        if (!network) return;

        if (tpl.data.onSelect) tpl.data.onSelect(network);
    });

    // Suggested networks
    tpl.suggestedNetworks = new ReactiveVar();
    tpl.autorun(function() {
        var networks = Networks.find({}, {limit: 10}).fetch();
        tpl.suggestedNetworks.set(networks);
    });
});

Template.NetworkSelector.onRendered(function() {
    var tpl = this;

    // Reset the form when the networkselector closes
    var form = tpl.find('form');
    tpl.autorun(function() {
        var activeVar = Template.currentData().isActive;
        if (!activeVar) return;

        if (!activeVar.get()) {
            form.reset();
        }
    });

});

Template.NetworkSelector.helpers({
    currentNetwork: function() {
        return Template.instance().currentNetwork.get();
    },
    suggestedNetworks: function() {
        return Template.instance().suggestedNetworks.get();
    },
    onAutocompleteQuery: function() {
        return function(query, sync, async) {
            Meteor.call('networks.autocomplete', query, function(error, networks) {
                lodash.each(networks, function(n) {
                    n.value = n.name; // what to show in the autocomplete list
                });
                async(networks);
            });
        };
    },
    onAutocompleteSelect: function() {
        var tpl = Template.instance();

        return function(network) {
            tpl.currentNetwork.set(network);
        };
    }
});

Template.NetworkSelector.events({
    'click [data-select-suggested-network]': function(event, template) {
        var networks = template.suggestedNetworks.get();
        if (!networks || !networks.length) return;

        var networkId = event.currentTarget.getAttribute('data-select-suggested-network');
        var network = lodash.find(networks, {_id: networkId});
        template.currentNetwork.set(network);
    },
    'submit form': function(event) {
        event.preventDefault();
    }
});
