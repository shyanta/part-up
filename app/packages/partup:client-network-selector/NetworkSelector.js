Template.NetworkSelector.onCreated(function() {
    var tpl = this;

    // When the value changes, notify the parent using the onSelect callback
    this.currentNetwork = new ReactiveVar(false, function(a, networkId) {
        if (!networkId) return;

        if (tpl.data.onSelect) tpl.data.onSelect(networkId);
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

    // Bind the autocomplete
    var inputElement = tpl.find('form').elements.search;
    $(inputElement).on('typeahead:select', function(event, network) {
        tpl.currentNetwork.set(network._id);
    });
    Meteor.typeahead(inputElement, function(query, sync, async) {

        // Temp: all networks
        sync(Networks
                .find()
                .fetch()
                .map(function(n) {
                    n.value = n.name;
                    return n;
                }));

        // Todo: implement Meteor.call for autocomplete results
        // Meteor.call('networks.search_by_name', query, function(networks) {
        //     lodash.each(networks, function(network) {
        //         network.value = network.name;
        //     });
        //     async(networks);
        // });
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
    },
    'submit form': function(event) {
        event.preventDefault();
    }
});
