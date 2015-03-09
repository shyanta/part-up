Partups = new Meteor.Collection('partups');

Partups.findAll = function() {
    return Partups.find();
};

Meteor.methods({
    'partups/custommethod': function() {

    }
});
