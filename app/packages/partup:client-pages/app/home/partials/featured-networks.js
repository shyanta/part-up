Template.FeaturedNetworks.onCreated(function() {
    var template = this;

    var firstNetwork = template.data.networks[0];
    template.selectedSlug = new ReactiveVar(firstNetwork.slug);
});

Template.FeaturedNetworks.helpers({
    selectedNetwork: function() {
        var template = Template.instance();
        var selected = template.selectedSlug.get();

        return _.find(template.data.networks, function(item) {
            return item.slug == selected;
        });
    },
    networkLogo: function() {
        var network = this;

        if (network.logoObject) {
            return Partup.helpers.url.getImageUrl(network.logoObject, '360x360');
        } else if (network.imageObject) {
            return Partup.helpers.url.getImageUrl(network.imageObject, '360x360');
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
