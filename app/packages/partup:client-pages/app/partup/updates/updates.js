/**
 * Updates constants
 */
var STARTING_LIMIT = 10;
var INCREMENT = 10;

/**
 * Updates created
 */
Template.app_partup_updates.onCreated(function() {
    var tpl = this;

    // Own subscription handle
    tpl.handle;

    // Filter reactive variable (on change, set value to the tpl.options reactive var)
    tpl.filter = new ReactiveVar('default', function(oldFilter, newFilter) {
        var options = tpl.options.get();
        options.filter = newFilter;
        tpl.options.set(options);
    });

    // Subscribe (and re-subscribe when the options change)
    tpl.options = new ReactiveVar({}, function(a, b) {
        var options = b;
        tpl.resetLimit();
        options.limit = tpl.limit.get();

        var oldHandle = tpl.handle;
        tpl.handle = tpl.subscribe('updates.from_partup', tpl.data.partupId, options);
        tpl.updates.loading = true;

        Meteor.autorun(function whenSubscriptionIsReady(computation) {
            if (tpl.handle.ready()) {
                computation.stop(); // Stop the autorun
                if (oldHandle) oldHandle.stop();
                tpl.updates.loading = false;

                /**
                 * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                 * -
                 */
                Tracker.nonreactive(function replacePartups() {
                    tpl.updates.updateModel();
                    tpl.updates.updateView();
                });
            }
        });
    });

    // Re-subscribe when the limit changes
    tpl.limit = new ReactiveVar(STARTING_LIMIT, function(a, b) {
        var first = b === STARTING_LIMIT;
        if (first) return;

        var options = tpl.options.get();
        options.limit = b;

        var oldHandle = tpl.handle;
        tpl.handle = tpl.subscribe('updates.from_partup', tpl.data.partupId, options);
        tpl.updates.loading = true;

        Meteor.autorun(function whenSubscriptionIsReady(computation) {
            if (tpl.handle.ready()) {
                computation.stop(); // Stop the autorun
                if (oldHandle) oldHandle.stop();
                tpl.updates.loading = false;

                /*
                 * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                 * -
                 **/
                Tracker.nonreactive(function addPartups() {
                    var modelUpdates = tpl.updates.updateModel();
                    var viewUpdates = tpl.updates.view.get();

                    var difference = modelUpdates.length - viewUpdates.length;
                    tpl.updates.end_reached = difference < INCREMENT;

                    var addedUpdates = mout.array.filter(modelUpdates, function(update) {
                        return !mout.array.find(viewUpdates, function(_update) {
                            return update._id === _update._id;
                        });
                    });

                    tpl.updates.addToView(addedUpdates);
                });
            }
        });
    });

    // Limit functions
    tpl.increaseLimit = function() {
        tpl.limit.set(tpl.limit.get() + INCREMENT);
    };
    tpl.resetLimit = function() {
        tpl.limit.set(STARTING_LIMIT);
        tpl.updates.end_reached = false;
    };

    // Updates model
    tpl.updates = {

        loading: false,
        end_reached: false,
        refreshDate: new ReactiveVar(new Date()),

        model: Updates.findByFilter(tpl.data.partupId),
        updateModel: function() {
            Tracker.nonreactive(function() {
                var options = tpl.options.get();
                tpl.updates.model = Updates.findByFilter(tpl.data.partupId, options.filter, options.limit);
            });
            return tpl.updates.model.fetch();
        },

        view: new ReactiveVar([]),
        updateView: function() {
            Tracker.nonreactive(function() {
                var updates = tpl.updates.model.fetch();
                tpl.updates.view.set(updates);
                tpl.updates.refreshDate.set(new Date());
            });
        },
        addToView: function(updates) {
            Tracker.nonreactive(function() {
                var current_updates = tpl.updates.view.get();
                tpl.updates.view.set(current_updates.concat(updates));
            });
        }
    };

    // When the model changes and the view is empty, update the view with the model
    tpl.autorun(function() {
        var updates = tpl.updates.model.fetch();

        if (updates.length && !tpl.updates.view.get().length) {
            tpl.updates.view.set(updates);
            tpl.updates.refreshDate.set(new Date());
        }
    });

    // First run
    tpl.options.set({});
});

/**
 * Updates rendered
 */
Template.app_partup_updates.onRendered(function() {
    var tpl = this;

    /**
     * Infinite scroll
     */
    Partup.client.scroll.infinite({
        template: tpl,
        element: tpl.find('[data-infinitescroll-container]')
    }, function() {
        if (tpl.updates.loading || tpl.updates.end_reached) return;
        tpl.increaseLimit();
    });

});

/**
 * Updates helpers
 */
Template.app_partup_updates.helpers({
    updates: function() {
        return Template.instance().updates.view.get();
    },

    newUpdatesCount: function() {
        var template = Template.instance();
        var refreshDate = template.updates.refreshDate.get();

        return lodash.filter(template.updates.model.fetch(), function(update) {
            return moment(update.updated_at).diff(refreshDate) > 0;
        }).length;
    },

    anotherDay: function(update) {
        var TIME_FIELD = 'created_at';

        var updates = Template.instance().updates.view.get();
        var currentIndex = lodash.findIndex(updates, update);
        var previousUpdate = updates[currentIndex - 1];
        var previousMoment = moment();

        if (previousUpdate) {
            previousMoment = moment(previousUpdate[TIME_FIELD]);
        }

        var currentMoment = moment(update[TIME_FIELD]);

        return previousMoment.diff(currentMoment) > 24 * 60 * 60 * 1000;
    },
    isLoggedIn: function() {
        var user = Meteor.user();
        return !!user;
    },
    isUpper: function() {
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne(Router.current().params._id);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    },

    metaDataForUpdate: function() {
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
            invited_name: update.type_data.name,
            is_contribution: is_contribution
        };
    },

    filterReactiveVar: function() {
        return Template.instance().filter;
    }
});

/**
 * Updates events
 */
Template.app_partup_updates.events({
    'click [data-newmessage-popup]': function(event, template) {
        Partup.client.popup.open('new-message', function() {
            template.updates.updateView();
        });
    },
    'click [data-reveal-new-updates]': function(event, template) {
        template.updates.updateView();
    }
});
