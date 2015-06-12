/*************************************************************/
/* Widget functions */
/*************************************************************/
var getUpdates = function getUpdates () {
    var partupId = Router.current().params._id;

    // Get the option that is selected in the filter dropdown

    return Updates.find({}).map(function(update, idx) {
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

    template.autorun(function() {
        var updates = getUpdates();
        template.allUpdates.set(updates);

        var shownUpdates = template.shownUpdates.curValue;
        if (!shownUpdates || !shownUpdates.length) {
            template.updateShownUpdates();
        }
    });

    template.dropdownValue = new ReactiveVar(false, function(oldValue, newValue) {
        if (oldValue === newValue) return;
        if (template.subscription) template.subscription.stop();
        template.subscription = Meteor.subscribe('partups.one.updates', Router.current().params._id, {filter: newValue});
        template.updateShownUpdates();
        console.log('ReactiveVar');
    });

    template.autorun(function(computation) {
        var filter = Session.get('partial-dropdowns-updates-actions.selected');
        template.dropdownValue.set(filter);
        console.log('Computation', filter);
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
            updateUpperImage: Images.findOne({_id: updateUpper.profile.image}),
            updated_at: update.updated_at,
            path: path,
            update_type: update.type,
            invited_name: update.type_data.invited_name,
            is_contribution: is_contribution
        };
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
