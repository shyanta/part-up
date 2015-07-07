/**
 * Updates created
 */
Template.app_partup_updates.onCreated(function() {
    var tpl = this;

    tpl.subscribe('partups.metadata', tpl.data.partupId);

    // Updates model
    tpl.updates = {

        // Constants
        STARTING_LIMIT: 10,
        INCREMENT: 10,

        // States
        loading: new ReactiveVar(true),
        rendering: new ReactiveVar(),
        end_reached: new ReactiveVar(true),

        // Date of the last refresh
        refreshDate: new ReactiveVar(new Date(), function(a) {
            tpl.updates.refreshDate_remembered.set(a);
        }),
        refreshDate_remembered: new ReactiveVar(),

        // Updates handle
        handle: null,

        // The data model
        model: Updates.findForUpdates(tpl.data.partupId),
        updateModel: function() {
            Tracker.nonreactive(function() {
                var options = tpl.updates.options.get();
                tpl.updates.model = Updates.findForUpdates(tpl.data.partupId, options);
            });
            return tpl.updates.model.fetch();
        },

        // The view model
        view: new ReactiveVar([]),
        updateView: function() {
            Tracker.nonreactive(function() {
                var updates = tpl.updates.model.fetch();
                tpl.updates.view.set(updates);
                tpl.updates.refreshDate.set(new Date());
            });
        },
        addToView: function(updates) {
            var self = this;
            Tracker.nonreactive(function() {
                var current_updates = self.view.get();
                self.view.set(current_updates.concat(updates));
            });
        },

        // Options reactive variable (on change, update the whole view model)
        options: new ReactiveVar({}, function(a, b) {
            tpl.updates.loading.set(true);

            tpl.updates.resetLimit();

            var options = b;
            options.limit = tpl.updates.limit.get();

            var oldHandle = tpl.updates.handle;
            tpl.updates.handle = tpl.subscribe('updates.from_partup', tpl.data.partupId, options);

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.updates.handle.ready()) {
                    computation.stop(); // Stop the autorun
                    if (oldHandle) oldHandle.stop();

                    /**
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Update the model (recall the findForUpdates, with the new limit)
                     * - Refresh the view model
                     */
                    Tracker.nonreactive(function replacePartups() {
                        tpl.updates.updateModel();
                        tpl.updates.updateView();
                    });

                    // Unset loading state
                    tpl.updates.loading.set(false);
                }
            });
        }),

        // Filter reactive variable (on change, set value to the tpl.options reactive var)
        filter: new ReactiveVar('default', function(oldFilter, newFilter) {
            var options = tpl.updates.options.get();
            options.filter = newFilter;
            tpl.updates.options.set(options);
        }),

        // The reactive limit variable (on change, add updates to the view)
        limit: new ReactiveVar(this.STARTING_LIMIT, function(a, b) {
            var first = b === tpl.updates.STARTING_LIMIT;
            if (first) return;

            tpl.updates.loading.set(true);

            var options = tpl.updates.options.get();
            options.limit = b;

            var oldHandle = tpl.updates.handle;
            tpl.updates.handle = tpl.subscribe('updates.from_partup', tpl.data.partupId, options);

            Meteor.autorun(function whenSubscriptionIsReady(computation) {
                if (tpl.updates.handle.ready()) {
                    computation.stop(); // Stop the autorun
                    if (oldHandle) oldHandle.stop();

                    /*
                     * From here, put the code in a Tracker.nonreactive to prevent the autorun from reacting to this
                     * - Update the model (recall the findForUpdates, with the new limit)
                     * - Get the current viewmodel
                     * - Determine whether the end is reached
                     * - Determine the added updates by comparing the _ids
                     * - Add the added updates to the current view model
                     **/
                    Tracker.nonreactive(function addPartups() {
                        var modelUpdates = tpl.updates.updateModel();
                        var viewUpdates = tpl.updates.view.get();

                        var difference = modelUpdates.length - viewUpdates.length;
                        var end_reached = difference < tpl.updates.INCREMENT;
                        tpl.updates.end_reached.set(end_reached);

                        var addedUpdates = mout.array.filter(modelUpdates, function(update) {
                            return !mout.array.find(viewUpdates, function(_update) {
                                return update._id === _update._id;
                            });
                        });

                        tpl.updates.addToView(addedUpdates);
                    });

                    // Unset loading state
                    tpl.updates.loading.set(false);
                }
            });
        }),

        increaseLimit: function() {
            tpl.updates.limit.set(tpl.updates.limit.get() + tpl.updates.INCREMENT);
        },

        resetLimit: function() {
            tpl.updates.limit.set(tpl.updates.STARTING_LIMIT);
            tpl.updates.end_reached.set(false);
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
    tpl.updates.options.set({});
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
        if (tpl.updates.loading.get() || tpl.updates.end_reached.get()) return;
        tpl.updates.increaseLimit();
    });

});

/**
 * Updates destroyed
 */
Template.app_partup_updates.onDestroyed(function() {
    var tpl = this;
    if (tpl.updates.handle) tpl.updates.handle.stop();
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

    isAnotherDay: function() {
        var update = this;

        // WARNING: this helper assumes that the list is always sorted by TIME_FIELD
        var TIME_FIELD = 'updated_at';

        // Find previous update
        var updates = Template.instance().updates.view.get();
        var currentIndex = lodash.findIndex(updates, update);
        var previousUpdate = updates[currentIndex - 1];

        // Moments
        var previousMoment = moment(previousUpdate ? previousUpdate[TIME_FIELD] : undefined);
        var currentMoment = moment(update[TIME_FIELD]);

        // Determine whether this update is another day
        return Partup.client.moment.isAnotherDay(previousMoment, currentMoment);
    },
    isLoggedIn: function() {
        var user = Meteor.user();
        return !!user;
    },
    isUpper: function() {
        var template = Template.instance();

        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne(template.data.partupId);
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
        return Template.instance().updates.filter;
    },

    updatesEndReached: function() {
        return Template.instance().updates.end_reached.get();
    },

    // New updates separator
    showNewUpdatesSeparator: function() {
        var update = this;
        var tpl = Template.instance();

        // WARNING: this helper assumes that the list is always sorted by TIME_FIELD
        var TIME_FIELD = 'updated_at';

        // Find remembered refreshDate
        var rememberedRefreshDate = tpl.updates.refreshDate_remembered.get();
        if (!rememberedRefreshDate) return false;
        var rememberedRefreshMoment = moment(rememberedRefreshDate);

        // Find previous update
        var updates = tpl.updates.view.get();
        var currentIndex = lodash.findIndex(updates, update);
        var previousUpdate = updates[currentIndex - 1];
        if (!previousUpdate) return false;

        // Date comparisons
        var previousUpdateIsNewer = moment(previousUpdate[TIME_FIELD]).diff(rememberedRefreshMoment) > 0;
        var currentUpdateIsOlder = moment(update[TIME_FIELD]).diff(rememberedRefreshMoment) < 0;

        // Return true when the previous update is newer
        // and the current update older than the remember refresh date
        return previousUpdateIsNewer && currentUpdateIsOlder;
    },

    // Loading / rendering state
    updatesLoading: function() {
        return Template.instance().updates.loading.get();
    },
    updatesLoadingOrRendering: function() {
        return Template.instance().updates.loading.get() || Template.instance().updates.rendering.get();
    },
    updatesRenderedCallback: function() {
        var tpl = Template.instance();
        tpl.updates.rendering.set(true);
        return function() {
            tpl.updates.rendering.set(false);
        };
    }
});

/**
 * Updates events
 */
Template.app_partup_updates.events({
    'click [data-newmessage-popup]': function(event, template) {
        event.preventDefault();
        Partup.client.popup.open('new-message', function() {
            template.updates.updateView();
        });
    },
    'click [data-reveal-new-updates]': function(event, template) {
        event.preventDefault();
        template.updates.updateView();
    }
});
