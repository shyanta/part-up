Template.UserCardContent.helpers({
    data: function() {
        return Meteor.users.findOne({_id: this._id});
    }
});
