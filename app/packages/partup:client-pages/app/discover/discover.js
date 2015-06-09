/*************************************************************/
/* Page initial */
/*************************************************************/
Template.app_discover.onCreated(function() {
    this.partups = Partups.find();
    this.subscription = Meteor.subscribe('partups.all');
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_discover.helpers({
    partups: function() {
        return Template.instance().partups;
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
