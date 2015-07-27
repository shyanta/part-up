Meteor.publish('images.one', function(id) {
    return Images.find({_id: id});
});
