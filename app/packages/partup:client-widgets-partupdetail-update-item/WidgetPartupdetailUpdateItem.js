var commentsExpandedValue, commentsExpandedTracker = new Tracker.Dependency;

/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.onRendered(function () {
    commentsExpandedValue = this.data.update.comments.length > 0;
    commentsExpandedTracker.changed();
});


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.helpers({

    'titleKey': function titleKey () {
        return 'partupdetail-update-item-type-' + this.update.type + '-title';
    },

    'commentsExpanded': function commentsExpanded () {
        commentsExpandedTracker.depend();
        return commentsExpandedValue;
    }

});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.events({
    
    'click [data-expand-comment-field]': function eventClickExpandCommentField (event) {
        // commentsExpandedValue = true;
        // commentsExpandedTracker.changed();
    }

});
