/*************************************************************/
/* Widget functions */
/*************************************************************/
var getUpdates = function getUpdates () {
    var partupId = Router.current().params._id;

    // Get the option that is selected in the filter dropdown
    var option = Session.get('partial-dropdown-updates-actions.selected');

    return Updates.find({partup_id: partupId}, {sort: {updated_at: -1}}).map(function(update, idx) {
        update.arrayIndex = idx;
        return update;
    }).filter(function(update, idx) {
        if (option === 'default') return true;

        if (option === 'my-updates') {
            return update.upper_id === Meteor.user()._id;
        }

        if (option === 'activities') {
            return update.type && update.type.indexOf('activities') > -1;
        }

        if (option === 'partup-changes') {
            var isPartupChange = (update.type.indexOf('tags') > -1 ||
                                  update.type.indexOf('end_date') > -1 ||
                                  update.type.indexOf('name') > -1 ||
                                  update.type.indexOf('description') > -1 ||
                                  update.type.indexOf('image') > -1 ||
                                  update.type.indexOf('budget') > -1);

            return update.type && isPartupChange;
        }

        if (option === 'messages') {
            return update.type && update.type.indexOf('message') > -1;
        }

        if (option === 'contributions') {
            return update.type && update.type.indexOf('contributions') > -1;
        }

        return true;
    });
};

/*************************************************************/
/* On created */
/*************************************************************/
Template.app_partup_updates.onCreated(function() {
    var template = this;
    template.allUpdates = new ReactiveVar();
    template.shownUpdates = new ReactiveVar();

    template.autorun(function() {
        var updates = getUpdates();
        template.allUpdates.set(updates);

        if (!template.shownUpdates.curValue || !template.shownUpdates.curValue.length) {
            template.shownUpdates.set(updates);
        }
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.app_partup_updates.helpers({

    'updates': function helperUpdates () {
        var template = Template.instance();
        return template.shownUpdates.get();
    },

    'newUpdatesCount': function newUpdatesCount() {
        var template = Template.instance();
        return template.allUpdates.get().length - template.shownUpdates.get().length;
    },

    'anotherDay': function helperAnotherday (update) {
        var TIME_FIELD = 'created_at';

        var updates = getUpdates(); //updatesVar.get(); // getUpdates()
        var currentIndex = lodash.findIndex(updates, update);
        var previousUpdate = updates[currentIndex - 1];
        var previousMoment = moment();

        if (previousUpdate) {
            previousMoment = moment(previousUpdate[TIME_FIELD]);
        }

        var currentMoment = moment(update[TIME_FIELD]);

        return previousMoment.diff(currentMoment) > 24 * 60 * 60 * 1000;
    },
    'isLoggedIn': function helperIsLoggedIn() {
        var user = Meteor.user();
        return !!user;
    },
    'isUpper': function helperIsUpper () {
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne(Router.current().params._id);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    }

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.app_partup_updates.events({
    'click [data-reveal-new-updates]': function(event, template) {
        template.shownUpdates.set(template.allUpdates.curValue);
    }
});
