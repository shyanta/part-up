Template.FeaturedNetworks.onCreated(function() {
    var tpl = this;
    tpl.selectedSlug = new ReactiveVar('', function(a, b) {
        if (tpl.networkSubscription) tpl.networkSubscription.stop();
        tpl.networkSubscription = tpl.subscribe('networks.one', b);
    });
});
Template.FeaturedNetworks.helpers({
    networks: function() {
        return Networks.find().fetch();
    },
    selectedNetworkSlug: function() {
        return Template.instance().selectedSlug.get();
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
