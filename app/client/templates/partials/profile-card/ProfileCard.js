Template.PartialProfileCard.onCreated(function(){
    //
});
Template.PartialProfileCard.onRendered(function(){
    //
});

Template.PartialProfileCard.helpers({
    data: function(){
        return Meteor.users.findOne({_id: this._id});
    }
})