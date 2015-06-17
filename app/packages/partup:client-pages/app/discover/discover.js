/*************************************************************/
/* Page initial */
/*************************************************************/
Template.app_discover.onCreated(function() {
    var template = this;
    template.limitedPartupsSubscription = template.subscribe('partups.limit', 20);
    template.limit = new ReactiveVar(20, function(a, b) {
        if (a < b) {
            var oldSubscription = template.limitedPartupsSubscription;
            template.limitedPartupsSubscription = template.subscribe('partups.limit', b);
            oldSubscription.stop();
        }
    });

    template.filter = new ReactiveVar('none');

    Session.set('refreshDate', Math.round(new Date().getTime()));
});

Template.app_discover.onRendered(function() {
    var template = this;
    var raiseLimit = function() {
        console.log('RAISE THE LIMIT');
        var limit = template.limit.get();
        console.log(limit);
        limit = limit + 20;
        template.limit.set(limit);
    };
    var debouncedRaiseLimit = lodash.debounce(raiseLimit, 500, true);
    template.autorun(function() {
        var offset = Session.get('window.scrollBottomOffset');
        if (offset > $(window).height()) return;
        // console.log(offset);
        Tracker.nonreactive(function() {
            debouncedRaiseLimit();
        });
    });
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_discover.helpers({
    partups: function() {
        var subscription = Template.instance().limitedPartupsSubscription;
        var limit = Template.instance().limit.get();
        // if (!subscription.ready()) return;
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
