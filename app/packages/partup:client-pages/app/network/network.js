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

        var collapsedText = clickedElement.data('collapsed-text') || false;
        var expandedText = clickedElement.data('expanded-text') || false;

        if (parentElement.hasClass('pu-state-open')) {
            if (collapsedText) clickedElement.html(clickedElement.data('collapsed-text'));
        } else {
            if (expandedText) clickedElement.html(clickedElement.data('expanded-text'));
        }

        $(event.target.parentElement).toggleClass('pu-state-open');
    }
});
