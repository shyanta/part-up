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

    'titleKey': function helperTitleKey() {
        return 'partupdetail-update-item-type-' + this.update.type + '-title';
    },

    'generateFormId': function () {
        return 'commentForm-' + this.update._id;
    },

    'formSchema': Partup.schemas.forms.updateComment,

    'commentInputFieldExpanded': function helperCommentInputFieldExpanded() {
        return commentInputFieldExpandedDict.get(this.update._id);
    },

    'commentPostButtonActive': function helperCommentPostButtonActive() {
        return commentPostButtonActiveDict.get(this.update._id);
    },

    'shownComments': function helperShownComments() {
        var allComments = this.update.comments;
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        if (commentsExpanded)
            return allComments;
        else
            return allComments.slice(-MAX_COLLAPSED_COMMENTS);
    },

    'showExpandButton': function helperShowExpandButton() {
        var hiddenComments = this.update.comments.length - MAX_COLLAPSED_COMMENTS > 0;
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        return hiddenComments && !commentsExpanded;
    },

    'currentUser': function helperUser() {
        return Meteor.user();
    },

    'updateUpper': function getUpdateUpper() {
        var user = Meteor.users.findOne({_id: this.update.upper_id});

        if (user.profile && user.profile.image) {
            user.profile.image = Images.findOne({_id: user.profile.image});
        }

        return user;
    },

    'getImageUrlById': function getImageUrlById(imageId) {
        return Images.findOne({_id: imageId}).url();
    }

});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.events({

    'click [data-expand-comment-field]': function eventClickExpandCommentField(event, template) {
        commentInputFieldExpandedDict.set(template.data.update._id, true);
    },

    'click [data-expand-comments]': function eventClickExpandComments(event, template) {
        commentsExpandedDict.set(template.data.update._id, true);
    },

    'input [data=commentfield]': function eventChangeCommentField(event, template) {
        var hasValue = event.currentTarget.value ? true : false;
        commentPostButtonActiveDict.set(template.data.update._id, hasValue);
    }

});

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc) {
            var self = this;
            self.event.preventDefault();

            var formNameParts = self.formId.split('-');
            if (formNameParts.length !== 2 || formNameParts[0] !== 'commentForm') return;
            var updateId = formNameParts[1];

            Meteor.call('updates.comments.insert', updateId, insertDoc, function (error, result) {
                if (error) {
                    return Partup.ui.notify.iError('error-method-' + error.reason);
                } else {
                    commentPostButtonActiveDict.set(updateId, false);
                    AutoForm.resetForm(self.formId);
                }
            });

            self.done();
            return false;
        }
    }
);
