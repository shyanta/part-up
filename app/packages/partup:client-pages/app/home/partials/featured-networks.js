Template.FeaturedNetworks.onCreated(function() {
    var tpl = this;
    Meteor.autorun(function() {
        var language = Partup.client.language.current.get();
        if (!language) return;

        tpl.featuredSubscription = tpl.subscribe('networks.featured_all', language, {
            onReady: function() {
                var networks = Networks.findFeatured(language).fetch();
                tpl.selectedSlug.set(networks[0].slug);
            }
        });
        tpl.selectedSlug = new ReactiveVar('');
    });
});
Template.FeaturedNetworks.helpers({
    networks: function() {
        var language = Partup.client.language.current.get();
        return Networks.findFeatured(language);
    },
    selectedNetwork: function() {
        var slug = Template.instance().selectedSlug.get();
        return Networks.findOne({slug: slug});
    },
    networkFeaturedByUser: function() {
        if (!this.featured) return;

        return Meteor.users.findOne(this.featured.by_upper._id);
    },
});

Template.FeaturedNetworks.events({
    'click [data-select]': function(event, template) {
        var slug = $(event.currentTarget).data('select');
        template.selectedSlug.set(slug);
    }
});
