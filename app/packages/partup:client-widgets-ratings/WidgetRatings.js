/**
 * A widget that will render all given ratings
 *
 * @param {Cursor} contribution   The contribution which is being rated
 */

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetRatings.onCreated(function(){
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetRatings.helpers({
    canRate: function(){
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne({_id: this.contribution.partup_id});
        if (!partup) return false;

        return mout.array.contains(partup.uppers, user._id);
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetRatings.events({
});
