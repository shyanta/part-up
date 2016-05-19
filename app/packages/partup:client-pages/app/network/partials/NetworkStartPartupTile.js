Template.NetworkStartPartupTile.events({
    'click [data-create-partup-in-tribe]': function(event, template) {
        event.preventDefault();

        var networkSlug = template.data.networkSlug;
        var network = Networks.findOne({slug: networkSlug});

        Session.set('createPartupForNetworkById', network._id);

        Intent.go({route: 'create-details'}, function(slug) {
            if (slug) {
                Router.go('partup', {
                    slug: slug
                });
            } else {
                this.back();
            }
            Session.set('createPartupForNetworkById', false);
        });
    }
})
