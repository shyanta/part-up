// jscs:disable
/**
 * Widget to render comments and a comment field
 *
 * @module client-commentfield
 * @param {Object} update               The update object containing the comments
 * @param {ReactiveVar} showCommentForm Variable that controls the visibility of the comment form
 * @param {Number} LIMIT                Limit the amount of comments shown to this number, then add "show more" link
 * @param {Boolean} SHOW_COMMENTS       Show existing comments
 *
 */
// jscs:enable

/*************************************************************/
/* Widget reactives */
/*************************************************************/
var commentsExpandedDict = new ReactiveDict();
var commentInputFieldExpandedDict = new ReactiveDict();
var commentPostButtonActiveDict = new ReactiveDict();

/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.Comments.onCreated(function() {
    this.LIMIT = this.data.LIMIT || 0;
    this.submitting = new ReactiveVar(false);
    this.showComments = this.data.SHOW_COMMENTS === undefined ||
        this.data.SHOW_COMMENTS === true;
});

Template.Comments.onRendered(function() {
    var template = this;
    var update = template.data.update;
    commentsExpandedDict.set(update._id, false);
    commentInputFieldExpandedDict.set(update._id, update.comments_count > 0);
    commentPostButtonActiveDict.set(update._id, false);
});

Template.Comments.helpers({
    commentPostButtonActive: function() {
        return commentPostButtonActiveDict.get(this.update._id);
    },
    formSchema: Partup.schemas.forms.updateComment,
    generateFormId: function() {
        return 'commentForm-' + this.update._id;
    },
    placeholders: {
        comment: function() {
            return __('widgetcommentfield-comment-placeholder');
        }
    },
    showComments: function() {
        return Template.instance().showComments;
    },
    showExpandButton: function() {
        if (!this.update) return false;

        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        if (commentsExpanded) return false;

        var limit = Template.instance().LIMIT;
        if (!limit) return false;

        var count = this.update.comments_count;
        if (!count || (count - limit) < 1) return false;

        return true;
    },
    showCommentForm: function() {
        return Template.instance().data.showCommentForm;
    },
    shownComments: function() {
        var comments = this.update.comments || [];

        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        if (commentsExpanded) return comments;

        var limit = Template.instance().LIMIT;
        if (!limit) return comments;

        return comments.slice(-limit);
    },
    systemMessage: function(content) {
        return __('comment-field-content-' + content);
    },
    submitting: function() {
        return Template.instance().submitting.get();
    }
});

Template.Comments.events({

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
