Template.modal_network_settings.helpers({
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
    }
});

Template.modal_network_settings.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        var network = Networks.findOne({slug: template.data.networkSlug});

        Intent.return('network-settings', {
            fallback_route: {
                name: 'network-detail',
                params: {
                    slug: network.slug
                }
            }
        });
    }
});
