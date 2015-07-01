Template.NetworkSelector.onCreated(function() {
    var tpl = this;

    this.currentNetwork = new ReactiveVar({}, function(a, network) {
        if (!network) return;

        if (tpl.data.onSelect) tpl.data.onSelect(network);
    });

    this.setNetwork = function(networkId) {
        this.currentNetwork.set(networkId);
    };
});

Template.NetworkSelector.helpers({
    currentNetwork: function() {
        return Template.instance().currentNetwork.get();
    },
    suggestedNetworks: function() {
        return Networks.find({}, {limit: 10});
    }
});

Template.NetworkSelector.events({
    'click [data-select-suggested-network]': function(event, template) {
        var networkId = event.currentTarget.getAttribute('data-select-suggested-network');
        template.setNetwork(networkId);
    }
});
