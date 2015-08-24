var SeoRouter = Picker.filter(function(request, response) {
    // TODO: Add more checks to see if we should render a snippet

    return /_escaped_fragment_/.test(request.url);
});

SeoRouter.route('/partups/:slug', function(params, request, response) {
    var slug = params.slug;

    var partupId = slug.split('-').pop();

    // TODO: Guard against non-existence
    var partup = Partups.findOne(partupId);
    var image = Images.findOne(partup.image);

    SSR.compileTemplate('seo_partup', Assets.getText('private/templates/partup.html'));

    Template.seo_partup.helpers({
        getPartupUrl: function() {
            return Meteor.absoluteUrl() + 'partups/' + partup.slug;
        },
        getImageUrl: function() {
            var url = image.url().substr(1);

            return Meteor.absoluteUrl() + encodeURIComponent(url).replace(/%2F/g, '/');
        }
    });

    var html = SSR.render('seo_partup', partup);

    response.setHeader('Content-Type', 'text/html');
    response.end(html);
});
