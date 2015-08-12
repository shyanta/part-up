Template.modal_network_invite.onCreated(function() {
    var self = this;
    self.userIds = new ReactiveVar([]);
    self.subscription = new ReactiveVar();
    self.suggestionsOptions = new ReactiveVar({});

    self.inviting = new ReactiveDict(); // loading boolean for each individual invite button

    self.loading = new ReactiveVar();

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
        self.loading.set(true);
        var network = Networks.findOne({slug: self.data.networkSlug});
        var options = self.suggestionsOptions.get();

        if (!network) return;

        Meteor.call('networks.user_suggestions', network._id, options, function(err, userIds) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }

            self.userIds.set(userIds);
            self.subscription.set(self.subscribe('users.by_ids', userIds));

            self.loading.set(false);
        });
    });
});

Template.modal_network_invite.helpers({
    inviteLoadingForUser: function(userId) {
        return Template.instance().inviting.get(userId);
    },
    loading: function() {
        return Template.instance().loading.get();
    },
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
        var networkSlug = Template.instance().data.networkSlug;
        var network = Networks.findOne({slug: networkSlug});
        if (!network) return;

        return network.isUpperInvited(this._id);
    },
    alreadyMember: function() {
        var networkSlug = Template.instance().data.networkSlug;
        var network = Networks.findOne({slug: networkSlug});

        return network.hasMember(this._id);
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

Template.modal_network_invite.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        var network = Networks.findOne({slug: template.data.networkSlug});

        Intent.return('network-detail', {
            fallback_route: {
                name: 'network-detail',
                params: {
                    slug: network.slug
                }
            }
        });
    },
    'click [data-invite-id]': function(event, template) {
        var userId = event.currentTarget.dataset.inviteId;
        var network = Networks.findOne({slug: template.data.networkSlug});

        if (network.hasMember(userId) || network.isUpperInvited(userId)) return;

        template.inviting.set(userId, true);
        Meteor.call('networks.invite_existing_upper', network._id, userId, function(err) {
            template.inviting.set(userId, false);

            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
        });
    },

    'submit form#suggestionsQuery': function(event, template) {
        event.preventDefault();

        template.loading.set(true);

        var form = event.currentTarget;

        template.suggestionsOptions.set({
            query: form.elements.search_query.value || undefined,
            locationId: form.elements.location_id.value || undefined
        });

        window.scrollTo(0, 0);
    },
    'keyup [data-search-query-input]': function(e, template) {
        if (window.PU_IE_VERSION === -1) return;
        // IE fix (return key submit)
        var pressedKey = e.which ? e.which : e.keyCode;
        if (pressedKey == 13) {
            template.submitFilterForm();
            return false;
        }
    },

    // Location selector events
    'click [data-open-locationselector]': function(event, template) {
        var current = template.location.selectorState.get();
        template.location.selectorState.set(!current);
    },
    'click [data-reset-selected-location]': function(event, template) {
        event.preventDefault();
        template.location.value.set('');
        template.submitFilterForm();
    }
});
