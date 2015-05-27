/**
 * A widget that will render all given ratings
 *
 * @param {Cursor} contribution   The contribution which is being rated
 * @param {Cursor} ratings   A Mongo Cursor object
 */

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetRatings.onCreated(function(){
    this.showHoverCard = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetRatings.helpers({
    contribution: function(){
        return Template.instance().data.contribution;
    },
    showHoverCard: function(){
        return Template.instance().showHoverCard.get();
    },
    showNewRating: function(){
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne({_id: this.contribution.partup_id});
        if (!partup) return false;

        var ratingUppers = mout.array.map(this.ratings.fetch(), function(rating){
            return rating.upper_id;
        });

        if (mout.array.contains(ratingUppers, user._id)) return false;

        return mout.array.contains(partup.uppers, user._id);
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetRatings.events({
    'click .pu-avatar-icon': function(event, template){
        // check if the click is inside the hovercard
        if ($(event.target).closest('.pu-hovercard').length) return;

        template.showHoverCard.set(!template.showHoverCard.get());
    }
});
