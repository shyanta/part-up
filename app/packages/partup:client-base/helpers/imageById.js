Template.registerHelper('partupImageById', function(id){
    return Images.findOne({ _id: id }).url();
});
