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

    partupUppers: function () {
        var partup = getPartup();

        if (! partup) return [];

        var uppers = partup.uppers || [];

        return Meteor.users.find({ _id: { $in: uppers } });
    },

    partupSupporters: function () {
        var partup = getPartup();

        if (! partup) return [];

        var supporters = partup.supporters || [];

        return Meteor.users.find({ _id: { $in: supporters } });
    },

    partupCover: function () {
        var partup = getPartup();

        console.log(partup);

        if (! partup || ! partup.image) return null;

        console.log(partup.image);

        return Images.findOne({ _id: partup.image });
    }

});


/*************************************************************/
/* Page events */
/*************************************************************/
Template.PagesPartupDetail.events({
    //
});
