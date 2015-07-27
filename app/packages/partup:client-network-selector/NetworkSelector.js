var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.NetworkSelector.onCreated(function() {
    Subs.subscribe('networks.list');
});

Template.NetworkSelector.helpers({
    networks: function() {
        return Networks.find();
    }
});

Template.NetworkSelector.events({
    'click [data-select-network]': function(event, template) {
        var networks = Networks.find().fetch();
        if (!networks || !networks.length) return;

        var networkId = event.currentTarget.getAttribute('data-select-network');
        var network = lodash.find(networks, {_id: networkId});

        if (template.data.onSelect) template.data.onSelect(network);
    }
});
