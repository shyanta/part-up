Template.app_partup.onCreated(function() {
    var template = this;

    template.partupId = new ReactiveVar();
    template.sectionActive = new ReactiveVar(false);

    var partup_sub;

    var continueLoadingPartupById = function(id) {
        var partup = Partups.findOne({_id: id});
        if (!partup) return Router.pageNotFound('partup');

        var userId = Meteor.userId();
        if (!partup.isViewableByUser(userId, Session.get('partup_access_token'))) return Router.pageNotFound('partup-closed');

        template.partupId.set(id);

        var seo = {
            title: Partup.client.notifications.createTitle(partup.name),
            meta: {
                title: partup.name,
                description: partup.description
            }
        };

        if (partup.image) {
            var image = Images.findOne({_id: partup.image});
            if (image) {
                var imageUrl = Partup.helpers.url.getImageUrl(image, '1200x520');
                if (imageUrl) seo.meta.image = encodeURIComponent(Meteor.absoluteUrl() + imageUrl);
            }
        }
        if (typeof partup._id === 'string') {
            // Reset new updates for current user
            Partup.client.updates.firstUnseenUpdate(partup._id).set();
        }
    };

    template.loading = {
        partup: new ReactiveVar(true),
        activities: new ReactiveVar(true),
        updates: new ReactiveVar(true),
        board: new ReactiveVar(true)
    };

    template.autorun(function() {
        var id = Template.currentData().partupId;
        var accessToken = Session.get('partup_access_token');

        partup_sub = Meteor.subscribe('partups.one', id, accessToken, {
            onReady: function() {
                // it's important the continueLoading logic is done AFTER
                // the subscription is ready to prevent false positives on
                // the 'partup not found' fallback
                continueLoadingPartupById(id);
                template.loading.partup.set(false);
            }
        }); // subs manager fails here
        template.subscribe('activities.from_partup', id, accessToken, {onReady: function() {
            template.loading.activities.set(false);
        }});
        template.subscribe('updates.from_partup', id, {}, accessToken, {onReady: function() {
            template.loading.updates.set(false);
        }});
        template.subscribe('board.for_partup_id', id, {onReady: function() {
            template.loading.board.set(false);
        }});
    });
});

Template.app_partup.onRendered(function() {
    var template = this;

    template.autorun(function(computation) {
        var partup = Partups.findOne({_id: template.data.partupId});
        if (!partup) return;
    });
});
Template.app_partup.events({
    'click [data-open-section-button]': function(event, template) {
        event.preventDefault();
        template.sectionActive.set(true);
    },
    'click [data-close-section]': function(event, template) {
        if (template.sectionActive.curValue) {
            event.preventDefault();
            template.sectionActive.set(false);
        }
    }
});

Template.app_partup.helpers({
    partupIsLoaded: function() {
        var template = Template.instance();
        return !(template.loading.partup.get() && template.loading.activities.get() && template.loading.updates.get() && template.loading.board.get());
    },
    sectionActive: function() {
        return Template.instance().sectionActive.get();
    },
    network: function() {
        var partup = Partups.findOne({_id: this.partupId});
        if (!partup) return;
        return Networks.findOne({_id: partup.network_id});
    },
    isActivities: function() {
        return Router.current().route.getName() === 'partup-activities';
    },
    boardViewEnabled: function() {
        var partup = Partups.findOne({_id: this.partupId});
        if (!partup) return;
        return partup.board_view;
    }
});
