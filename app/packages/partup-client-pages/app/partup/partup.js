Template.app_partup.onCreated(function() {
    var tpl = this;

    tpl.partupId = new ReactiveVar();
    tpl.sectionActive = new ReactiveVar(false);

    var partup_sub;

    var continueLoadingPartupById = function(id) {
        var partup = Partups.findOne({_id: id});
        if (!partup) return Router.pageNotFound('partup');

        var userId = Meteor.userId();
        if (!partup.isViewableByUser(userId, Session.get('partup_access_token'))) return Router.pageNotFound('partup-closed');

        tpl.partupId.set(id);

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

    tpl.autorun(function() {
        var template = Template.instance();
        var id = Template.currentData().partupId;
        var accessToken = Session.get('partup_access_token');

        partup_sub = Meteor.subscribe('partups.one', id, accessToken, {
            onReady: function() {
                // it's important the continueLoading logic is done AFTER
                // the subscription is ready to prevent false positives on
                // the 'partup not found' fallback
                continueLoadingPartupById(id);
            }
        }); // subs manager fails here
        template.subscribe('activities.from_partup', id, accessToken);
        template.subscribe('updates.from_partup', id, {}, accessToken);
    });
});

Template.app_partup.onRendered(function() {
    var tpl = this;

    tpl.autorun(function(computation) {
        var partup = Partups.findOne({_id: tpl.data.partupId});
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
        return Partups.findOne({_id: this.partupId});
    },
    sectionActive: function() {
        return Template.instance().sectionActive.get();
    }
});
