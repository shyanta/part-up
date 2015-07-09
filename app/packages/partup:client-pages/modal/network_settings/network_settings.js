Template.modal_network_settings.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        Partup.client.intent.return('network-settings', {}, function() {
            Router.go('network-detail', {
                _id: template.data.networkId
            });
        });
    }
});
