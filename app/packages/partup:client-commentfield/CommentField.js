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
Template.CommentField.onRendered(function() {
    var template = this;
    var update = template.data.update;
    commentsExpandedDict.set(update._id, false);
    commentInputFieldExpandedDict.set(update._id, update.comments_count > 0);
    commentPostButtonActiveDict.set(update._id, false);

    template.highlight = function() {
        if (template.data.expandedComments) return;
        var element = template.find('.pu-commentfield');
        var doc = document.documentElement;
        var scrollDuration = ((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)) / 2;
        $('html, body').animate({scrollTop: 0}, scrollDuration, function(e) {
            $(element).addClass('pu-state-highlight');
            Meteor.setTimeout(function() {
                $(element).removeClass('pu-state-highlight');
            }, 1000);
        });

    };
});

Template.CommentField.helpers({
    commentPostButtonActive: function helperCommentPostButtonActive() {
        return commentPostButtonActiveDict.get(this.update._id);
    },
    formSchema: Partup.schemas.forms.updateComment,
    generateFormId: function() {
        return 'commentForm-' + this.update._id;
    },
    placeholders: Partup.services.placeholders.commentfield,
    showExpandButton: function helperShowExpandButton() {
        var hiddenComments = 0;
        if (this.update && this.update.comments && this.update.comments_count) {
            hiddenComments = this.update.comments_count - MAX_COLLAPSED_COMMENTS > 0;
        }
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        return Template.instance().data.expandedComments ?
            false :
            hiddenComments && !commentsExpanded;
    },
    shownComments: function helperShownComments() {
        var allComments = this.update.comments || [];
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        if (commentsExpanded || Template.instance().data.expandedComments)
            return allComments;
        else
            return allComments.slice(-MAX_COLLAPSED_COMMENTS);
    },
    systemMessage: function helperSystemMessage (content) {
        return __('comment-field-content-' + content);
    }
});

Template.CommentField.events({

    'click [data-expand-comment-field]': function eventClickExpandCommentField(event, template) {
        commentInputFieldExpandedDict.set(template.data.update._id, true);

        // focus on input
        var input = template.find('[data="commentfield"]');
        Meteor.defer(function() {
            $(input).focus();
        });
    },

    'click [data-expand-comments]': function eventClickExpandComments(event, template) {
        commentsExpandedDict.set(template.data.update._id, true);
    },

    'input [data=commentfield]': function eventChangeCommentField(event, template) {
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

        Meteor.call('updates.comments.insert', updateId, insertDoc, function(error, result) {
            if (error) {
                return Partup.client.notify.error(__('error-method-' + error.reason));
            } else {
                commentPostButtonActiveDict.set(updateId, false);
                AutoForm.resetForm(self.formId);
                self.template.parent().highlight();

            }
        });

        self.done();
        return false;
    }
});
