/*************************************************************/
/* Page created */
/*************************************************************/
Template.app_partup.onCreated(function() {
    var template = this;
    template.partupSubscription = template.subscribe('partups.metadata', template.data.partupId);

    template.autorun(function() {

        var partup = Partups.findOne({_id: template.data.partupId});
        if (!partup) return;

        var seo = {
            title: partup.name,
            meta: {
                title: partup.name,
                description: partup.description
            }
        };

        if (partup.image) {
            var image = Images.findOne({_id: partup.image});
            if (image) {
                var imageUrl = image.url();
                if (imageUrl) seo.meta.image = imageUrl;
            }
        }
        SEO.set(seo);
    });

    Meteor.autorun(function whenSubscriptionIsReady(computation) {
        if (template.partupSubscription.ready()) {
            computation.stop();
            if (!Partups.findOne({_id: template.data.partupId})) {
                Router.pageNotFound('partup');
            }
        }
    });
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_partup.helpers({

    partup: function() {
        return Partups.findOne({_id: this.partupId});
    },

    subscriptionsReady: function() {
        return Template.instance().partupSubscription.ready();
    }

});
