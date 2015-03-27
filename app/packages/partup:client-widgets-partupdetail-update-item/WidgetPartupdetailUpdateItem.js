/*************************************************************/
/* Widget constants */
/*************************************************************/
var MAX_COLLAPSED_COMMENTS = 2;

/*************************************************************/
/* Widget reactives */
/*************************************************************/
var commentsExpandedDict = new ReactiveDict;
var commentInputFieldExpandedDict = new ReactiveDict;
var commentPostButtonActiveDict = new ReactiveDict;


/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.onRendered(function () {
    commentsExpandedDict.set(this.data.update._id, false);
    commentInputFieldExpandedDict.set(this.data.update._id, this.data.update.comments.length > 0);
    commentPostButtonActiveDict.set(this.data.update._id, false);
});


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.helpers({

    'titleKey': function helperTitleKey () {
        return 'partupdetail-update-item-type-' + this.update.type + '-title';
    },

    'commentInputFieldExpanded': function helperCommentInputFieldExpanded () {
        return commentInputFieldExpandedDict.get(this.update._id);
    },

    'commentPostButtonActive': function helperCommentPostButtonActive () {
        return commentPostButtonActiveDict.get(this.update._id);
    },

    'shownComments': function helperShownComments () {
        var allComments = this.update.comments;
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        if(commentsExpanded)
            return allComments;
        else
            return allComments.slice(- MAX_COLLAPSED_COMMENTS);
    },

    'showExpandButton': function helperShowExpandButton () {
        var hiddenComments = this.update.comments.length - MAX_COLLAPSED_COMMENTS > 0;
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        return hiddenComments && !commentsExpanded;
    },

    'currentUser': function helperUser () {
        return Meteor.user();
    }

});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.events({
    
    'click [data-expand-comment-field]': function eventClickExpandCommentField (event, template) {
        commentInputFieldExpandedDict.set(template.data.update._id, true);
    },

    'click [data-expand-comments]': function eventClickExpandComments (event, template) {
        commentsExpandedDict.set(template.data.update._id, true);
    },

    'input [data-commentfield]': function eventChangeCommentField (event, template) {
        var hasValue = event.currentTarget.value ? true : false;
        commentPostButtonActiveDict.set(template.data.update._id, hasValue);
    },

    'submit [data-addcomment]': function eventSubmitAddComment (event, template) {
        event.preventDefault();
        var form = event.currentTarget;
        var commentValue = lodash.find(form, {name: 'commentValue'}).value;
        if(!commentValue) return;


        // temp reactive var until mongo implementation
        var updates = template.data.updateVar.get();
        lodash.find(updates, { _id: template.data.update._id }).comments.push({
            author: {
                name: 'Jesse de Vries',
                image: {
                    url: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p320x320/10372513_10152630117689315_2823570313206588958_n.jpg?oh=e76400243d7ed2678ba0d74edd6640b1&oe=55B4CF02&__gda__=1437886258_2a6463042ac4dcef71cdbee34d6c55c7'
                }
            },
            content: commentValue
        });
        template.data.updateVar.set(updates);
        

        // todo: mongo implementation
        // --

        // Reset
        commentPostButtonActiveDict.set(template.data.update._id, false);
        form.reset();
    }

});
