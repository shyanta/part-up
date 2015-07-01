Template.NetworkSelector.onCreated(function() {
    var tpl = this;

    this.currentNetwork = new ReactiveVar(false, function(a, networkId) {
        if (!networkId) return;

        if (tpl.data.onSelect) tpl.data.onSelect(networkId);
    });
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
        template.currentNetwork.set(networkId);
    }
});
