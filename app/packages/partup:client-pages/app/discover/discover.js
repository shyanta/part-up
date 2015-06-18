/*************************************************************/
/* Page initial */
/*************************************************************/
Template.app_discover.onCreated(function() {
    var template = this;

    template.discoverSubscription = template.subscribe('partups.discover', 50);

    template.limit = new ReactiveVar(50, function(oldValue, newValue) {
        if (oldValue < newValue) {
            template.oldDiscoverSubscription = template.discoverSubscription;
            template.discoverSubscription = template.subscribe('partups.discover', newValue);
        } else if (oldValue > newValue) {
            template.discoverSubscription.stop();
            template.oldDiscoverSubscription.stop();
            template.discoverSubscription = template.subscribe('partups.discover', newValue);
        }
    });

    template.autorun(function() {
        if (!template.discoverSubscription.ready()) return;
        if (template.oldDiscoverSubscription) template.oldDiscoverSubscription.stop();
    });

    template.filter = new ReactiveVar('none');

    Session.set('refreshDate', Math.round(new Date().getTime()));
});
// page render
Template.app_discover.onRendered(function() {
    var template = this;
    var raiseLimit = function() {
        var limit = template.limit.get();
        limit = limit + 20;
        template.limit.set(limit);
    };
    var debouncedRaiseLimit = lodash.debounce(raiseLimit, 500, true);
    template.autorun(function() {
        var offset = Session.get('window.scrollBottomOffset');
        if (offset > $(window).height()) return;

        Tracker.nonreactive(function() {
            debouncedRaiseLimit();
        });
    });
});
// page destroy
Template.app_discover.onDestroyed(function() {
    var template = this;
    template.discoverSubscription.stop();
    if (template.oldDiscoverSubscription) template.oldDiscoverSubscription.stop();
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_discover.helpers({
    partups: function() {
        // var subscription = Template.instance().discoverSubscription.ready();
        // if(!subscription) return false;
        var partups = Partups.find().fetch();
        return partups;
    },
    refreshDate: function() {
        // var filter = Session.get('filter');
        // return Math.round(new Date().getTime());
        return Session.get('refreshDate');
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
