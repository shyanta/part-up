Meteor.publish('images.all', function () {
    return Images.find({});
});

Meteor.publish('images.one', function (id) {
    return Images.find({ _id: id });
});