// jscs:disable
/**
 * Widget to render comments and a comment field
 *
 * @module client-commentfield
 * @param {Object} update               The update object containing the comments
 * @param {ReactiveVar} showCommentForm Variable that controls the visibility of the comment form
 * @param {Boolean} COMMENTS_EXPANDED   If true, show all comments (don't show "show more comments" link)
 *
 */
// jscs:enable

/*************************************************************/
/* Widget constants */
/*************************************************************/
var MAX_COLLAPSED_COMMENTS = 2;

/*************************************************************/
/* Widget reactives */
/*************************************************************/
var commentsExpandedDict = new ReactiveDict();
var commentInputFieldExpandedDict = new ReactiveDict();
var commentPostButtonActiveDict = new ReactiveDict();

/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.CommentField.onCreated(function() {
    this.submitting = new ReactiveVar(false);
});

Template.CommentField.onRendered(function() {
    var template = this;
    var update = template.data.update;
    commentsExpandedDict.set(update._id, false);
    commentInputFieldExpandedDict.set(update._id, update.comments_count > 0);
    commentPostButtonActiveDict.set(update._id, false);
});

Template.CommentField.helpers({
    commentPostButtonActive: function() {
        return commentPostButtonActiveDict.get(this.update._id);
    },
    formSchema: Partup.schemas.forms.updateComment,
    generateFormId: function() {
        return 'commentForm-' + this.update._id;
    },
    placeholders: Partup.services.placeholders.commentfield,
    showExpandButton: function() {
        var hiddenComments = 0;
        if (this.update && this.update.comments && this.update.comments_count) {
            hiddenComments = this.update.comments_count - MAX_COLLAPSED_COMMENTS > 0;
        }
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        return Template.instance().data.COMMENTS_EXPANDED ?
            false :
            hiddenComments && !commentsExpanded;
    },
    showCommentForm: function() {
        return Template.instance().data.showCommentForm;
    },
    shownComments: function() {
        var allComments = this.update.comments || [];
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        if (commentsExpanded || Template.instance().data.COMMENTS_EXPANDED)
            return allComments;
        else
            return allComments.slice(-MAX_COLLAPSED_COMMENTS);
    },
    systemMessage: function(content) {
        return __('comment-field-content-' + content);
    },
    submitting: function() {
        return Template.instance().submitting.get();
    }
});

Template.CommentField.events({

    'click [data-expand-comments]': function(event, template) {
        commentsExpandedDict.set(template.data.update._id, true);
    },

    'input [data=commentfield]': function(event, template) {
        var hasValue = event.currentTarget.value ? true : false;
        commentPostButtonActiveDict.set(template.data.update._id, hasValue);
    }

});

AutoForm.addHooks(null, {
    onSubmit: function(insertDoc) {
        var self = this;
        self.event.preventDefault();

        var formNameParts = self.formId.split('-');
        if (formNameParts.length !== 2 || formNameParts[0] !== 'commentForm') return;
        var updateId = formNameParts[1];

        var template = self.template.parent();
        template.submitting.set(true);

        Meteor.call('updates.comments.insert', updateId, insertDoc, function(error, result) {
            template.submitting.set(false);
            if (error) {
                return Partup.client.notify.error(__('error-method-' + error.reason));
            }

            commentPostButtonActiveDict.set(updateId, false);
            AutoForm.resetForm(self.formId);
            self.done();
        });

        return false;
    }
});
