Template.modal_network_settings.helpers({
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
    }
});

Template.modal_network_settings.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        Intent.return('network-settings', {
            fallback_route: {
                name: 'network-detail',
                params: {
                    slug: template.data.networkSlug
                }
            }
        });
    }
});
