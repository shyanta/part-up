/*************************************************************/
/* Page initial */
/*************************************************************/
Template.app_discover.onCreated(function() {
    var template = this;
    template.allPartupsSubscription = template.subscribe('partups.all');
    template.limit = new ReactiveVar(1);
});

Template.app_discover.onRendered(function() {
    var template = this;
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_discover.helpers({
    partups: function() {
        var subscriptionReady = Template.instance().allPartupsSubscription.ready();
        var limit = Template.instance().limit.get();
        if (!subscriptionReady) return;
        var partups = Partups.find({}, {
            limit: 0
        }).fetch();
        return partups;
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_discover.events({
    'click [data-search]': function(event, template) {
        event.preventDefault();

        if (template.subscription) {
            template.subscription.stop();
        }

        var text = template.find('[data-search-query]').value;

        Meteor.call('partups.search', text, function(error, partupIds) {
            template.subscription = Meteor.subscribe('partups.ids', partupIds);
        });

        console.log(text);
    }
});
