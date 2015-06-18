/*************************************************************/
/* Page created */
/*************************************************************/
Template.app_partup.onCreated(function() {
    var template = this;

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
            var imageUrl = Images.findOne({_id: partup.image}).url();
            if (imageUrl) seo.meta.image = imageUrl;
        }
        SEO.set(seo);
    });
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_partup.helpers({

    partup: function() {
        return Partups.findOne({_id: this.partupId});
    }

});
