/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_network.helpers({
    network: function() {
        return Networks.findOne(this.networkId);
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_network.events({
    'click [data-join]': function(event, template) {
        Meteor.call('networks.join', template.data.networkId, function(error) {
            if (error) {
                Partup.client.notify.error(error.reason);
            } else {
                Partup.client.notify.success('joined network');
            }
        });
    },
    'click [data-expand]': function(event, template) {
        var clickedElement = $(event.target);
        var parentElement = $(event.target.parentElement);

        var collapsedText = __(clickedElement.data('collapsed-key')) || false;
        var expandedText = __(clickedElement.data('expanded-key')) || false;

        if (parentElement.hasClass('pu-state-open')) {
            if (collapsedText) clickedElement.html(collapsedText);
        } else {
            if (expandedText) clickedElement.html(expandedText);
        }

        $(event.target.parentElement).toggleClass('pu-state-open');
    }
});
