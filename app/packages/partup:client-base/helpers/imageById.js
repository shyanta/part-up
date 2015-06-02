Template.registerHelper('partupImageById', function(id) {
    if (!id) return '';
    var image = Images.findOne({_id: id});
    if (!image) return;
    return image.url();
});
