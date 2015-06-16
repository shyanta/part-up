/*************************************************************/
/* Widget functions */
/*************************************************************/
var getUpdates = function getUpdates () {
    var criteria = {};
    return Updates.find(criteria, {sort: {updated_at: -1}}).map(function(update, idx) {
        update.arrayIndex = idx;
        return update;
    });
};

/*************************************************************/
/* On created */
/*************************************************************/
Template.app_partup_updates.onCreated(function() {
    var template = this;

    template.allUpdates = new ReactiveVar();
    template.shownUpdates = new ReactiveVar();
    template.refreshDate = new ReactiveVar(new Date());

    template.updateShownUpdates = function() {
        template.shownUpdates.set(getUpdates());
        template.refreshDate.set(new Date());
    };

    // Update subscription function
    template.subscription;
    template.updateSubscription = function(filter) {
        if (template.subscription) template.subscription.stop();
        template.subscription = Meteor.subscribe('partups.one.updates', Router.current().params._id, {filter: filter});
        template.subscription.updated = true;
    };

    // Update subscription on filter change
    template.filterValue = new ReactiveVar('default', function(oldFilter, newFilter) {
        template.updateSubscription(newFilter);
    });

    // Set subscription once
    template.updateSubscription(template.filterValue.get());

    template.autorun(function() {
        var updates = getUpdates();
        template.allUpdates.set(updates);

        if (template.subscription.updated && template.subscription.ready()) {
            template.updateShownUpdates();
            template.subscription.updated = false;
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
        var refreshDate = template.refreshDate.get();
        return lodash.filter(template.allUpdates.get(), function(update) {
            return moment(update.updated_at).diff(refreshDate) > 0;
        }).length;
    },

    'anotherDay': function helperAnotherday (update) {
        var TIME_FIELD = 'created_at';

        var updates = getUpdates();
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
    },

    'metaDataForUpdate': function helperMetaDataForUpdate () {
        var update = this;
        var updateUpper = Meteor.users.findOne({_id: update.upper_id});

        var is_newuser = update.type.indexOf('partups_newuser') > -1;
        var is_contribution = update.type.indexOf('partups_contributions_') > -1;
        var path = '';
        if (is_newuser) {
            path = Router.path('profile', {_id: update.upper_id});
        } else if (is_contribution) {
            var activityUpdateId = Activities.findOne({_id: update.type_data.activity_id}).update_id;
            path = Router.path('partup-update', {_id: update.partup_id, update_id: activityUpdateId});
        } else {
            path = Router.path('partup-update', {_id: update.partup_id, update_id: update._id});
        }

        return {
            updateUpper: updateUpper,
            updated_at: update.updated_at,
            path: path,
            update_type: update.type,
            invited_name: update.type_data.invited_name,
            is_contribution: is_contribution
        };
    },

    'filterValueReactiveVar': function helperFilterValueReactiveVar () {
        var template = Template.instance();
        return template.filterValue;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.app_partup_updates.events({
    'click [data-newmessage-popup]': function(event, template) {
        Partup.client.popup.open('new-message', function() {
            template.updateShownUpdates();
        });
    },
    'click [data-reveal-new-updates]': function(event, template) {
        template.updateShownUpdates();
    }
});
