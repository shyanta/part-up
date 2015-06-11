/*************************************************************/
/* Widget events */
/*************************************************************/
Template.modal_partup_settings.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Partup.client.intent.executeIntentCallback('start');
    },
    'click [data-remove]': function(template, events) {
        Meteor.call('partups.remove', Router.current().params._id, function(error) {
            if (error) {
                Partup.client.notify.error(error.reason);
            } else {
                Router.go('discover');
            }
        });
    },
});
