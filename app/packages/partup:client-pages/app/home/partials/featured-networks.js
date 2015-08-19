Template.FeaturedNetworks.onCreated(function() {
    var tpl = this;
    tpl.featuredSubscription = tpl.subscribe('networks.featured_all', {
        onReady: function() {
            var networks = Networks.findFeatured().fetch();
            console.log(networks)
            tpl.selectedSlug.set(networks[0].slug);
        }
    });
    tpl.selectedSlug = new ReactiveVar('');
});
Template.FeaturedNetworks.helpers({
    networks: function() {
        return Networks.findFeatured();
    },
    selectedNetwork: function() {
        var slug = Template.instance().selectedSlug.get();
        return Networks.findOne({slug: slug});
    }
});

Template.FeaturedNetworks.events({
    'click [data-select]': function(event, template) {
        var slug = $(event.currentTarget).data('select');
        template.selectedSlug.set(slug);
    }
});
