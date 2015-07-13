Template.modal_network_settings.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        Intent.return('network-settings', {
            fallback_route: {
                name: 'network-detail',
                params: {
                    _id: template.data.networkId
                }
            }
        });
    }
});
