Template.FeaturedNetworks.onCreated(function() {
    var template = this;

    var firstNetwork = template.data.networks[0];
    template.selectedSlug = new ReactiveVar(firstNetwork.slug);
});

Template.FeaturedNetworks.helpers({
    selectedNetwork: function() {
        var networks = Template.instance().data.networks;
        return mout.object.find(networks, {
            slug: Template.instance().selectedSlug.get()
        });
    },
    networkLogo: function() {
        var network = this;

        if (network.logoObject) {
            return Partup.client.url.getImageUrl(network.logoObject, '360x360');
        } else if (network.imageObject) {
            return Partup.client.url.getImageUrl(network.imageObject, '360x360');
        }

        return '';
    }
});

Template.FeaturedNetworks.events({
    'click [data-select]': function(event, template) {
        event.preventDefault();
        var slug = event.currentTarget.dataset.select;
        template.selectedSlug.set(slug);
    }
});
