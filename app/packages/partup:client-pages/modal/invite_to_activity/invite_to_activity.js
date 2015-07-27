Template.modal_invite_to_activity.onCreated(function() {
    var self = this;
    self.userIds = new ReactiveVar([]);
    self.subscription = new ReactiveVar();
    self.suggestionsOptions = new ReactiveVar({});

    // Submit filter form
    self.submitFilterForm = function() {
        Meteor.defer(function() {
            var form = self.find('form#suggestionsQuery');
            $(form).submit();
        });
    };

    // Location filter datamodel
    self.location = {
        value: new ReactiveVar(),
        selectorState: new ReactiveVar(false, function(a, b) {
            if (!b) return;

            // Focus the searchfield
            Meteor.defer(function() {
                var searchfield = self.find('form#locationSelector').elements.search;
                if (searchfield) searchfield.focus();
            });
        }),
        selectorData: function() {
            var DROPDOWN_ANIMATION_DURATION = 200;

            return {
                onSelect: function(location) {
                    self.location.selectorState.set(false);

                    Meteor.setTimeout(function() {
                        self.location.value.set(location);
                        self.submitFilterForm();
                    }, DROPDOWN_ANIMATION_DURATION);
                }
            };
        }
    };

    self.autorun(function() {
        var activityId = self.data.activityId;
        var options = self.suggestionsOptions.get();

        Meteor.call('activities.user_suggestions', activityId, options, function(error, userIds) {
            if (error) {
                return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
            }

            self.userIds.set(userIds);
            self.subscription.set(self.subscribe('users.by_ids', userIds));
        });
    });
});

Template.modal_invite_to_activity.helpers({
    suggestions: function() {
        var sub = Template.instance().subscription.get();
        if (!sub || !sub.ready()) return;

        var suggestions = [];
        var userIds = Template.instance().userIds.get();
        for (var i = 0; i < userIds.length; i++) {
            suggestions.push(Meteor.users.findOne({_id: userIds[i]}));
        }

        return suggestions;
    },
    inviteSent: function() {
        var activityId = Template.instance().data.activityId;
        var userId = this._id;

        return !!Invites.findOne({
            activity_id: activityId,
            invitee_id: this._id,
            type: Invites.INVITE_TYPE_ACTIVITY_EXISTING_UPPER
        });
    },

    // Location
    locationValue: function() {
        return Template.instance().location.value.get();
    },
    locationSelectorState: function() {
        return Template.instance().location.selectorState;
    },
    locationSelectorData: function() {
        return Template.instance().location.selectorData;
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_invite_to_activity.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        Intent.return('partup-activity-invite', {
            fallback_route: {
                name: 'partup',
                params: {
                    _id: template.data.partupId
                }
            }
        });
    },
    'click [data-invite-id]': function(event, template) {
        var activityId = template.data.activityId;
        var userId = event.target.dataset.inviteId;

        Meteor.call('activities.invite_existing_upper', activityId, userId, function(error) {
            if (error) {
                return Partup.client.notify.error(TAPi18n.__('base-errors-' + error.reason));
            }

            Partup.client.notify.success(__('pages-modal-invite_to_activity-invite-success'));
        });
    },

    'submit form#suggestionsQuery': function(event, template) {
        event.preventDefault();

        var form = event.currentTarget;

        template.suggestionsOptions.set({
            query: form.elements.search_query.value || undefined,
            locationId: form.elements.location_id.value || undefined
        });

        window.scrollTo(0, 0);
    },

    // Location selector events
    'click [data-open-locationselector]': function(event, template) {
        var current = template.location.selectorState.get();
        template.location.selectorState.set(!current);
    },
    'click [data-reset-selected-location]': function(event, template) {
        event.stopPropagation();
        template.location.value.set('');
        template.submitFilterForm();
    }
});
