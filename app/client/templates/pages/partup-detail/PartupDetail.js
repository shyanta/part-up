/*************************************************************/
/* Local functions */
/*************************************************************/
var getPartup = function getPartup () {
    var partupId = Router.current().params._id;
    return Partups.findOne({ _id: partupId });
};

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.PagesPartupDetail.helpers({

    partup: function () {
        return getPartup;
    },

    partupSupporters: function () {
        var partup = getPartup();
        return partup ? Meteor.users.find({ _id: { $in: partup.supporters} }) : [];
    }

});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesPartupDetail.events({
    //
});
