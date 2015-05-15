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
Template.WidgetCommentField.onRendered(function () {
    var update = this.data.update;
    var comments = update.comments || [];
    commentsExpandedDict.set(update._id, false);
    commentInputFieldExpandedDict.set(update._id, comments.length > 0);
    commentPostButtonActiveDict.set(update._id, false);
});

Template.WidgetCommentField.helpers({
    'generateFormId': function () {
        return 'commentForm-' + this.update._id;
    },

    'formSchema': Partup.schemas.forms.updateComment,

    // 'commentInputFieldExpanded': function helperCommentInputFieldExpanded() {
    //     return commentInputFieldExpandedDict.get(this.update._id) ? 'pu-state-expanded' : '';
    // },

    'commentPostButtonActive': function helperCommentPostButtonActive() {
        return commentPostButtonActiveDict.get(this.update._id);
    },

    'shownComments': function helperShownComments() {
        var allComments = this.update.comments || [];
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        if (commentsExpanded || Template.instance().data.expandedComments)
            return allComments;
        else
            return allComments.slice(-MAX_COLLAPSED_COMMENTS);
    },

    'showExpandButton': function helperShowExpandButton() {
        var hiddenComments = 0;
        if(this.update && this.update.comments && this.update.comments.length) {
            hiddenComments = this.update.comments.length - MAX_COLLAPSED_COMMENTS > 0;
        }
        var commentsExpanded = commentsExpandedDict.get(this.update._id);
        return Template.instance().data.expandedComments ? false : hiddenComments && !commentsExpanded;
    },

    'currentUser': function helperUser() {
        return Meteor.user();
    },
});

Template.WidgetCommentField.events({

    'click [data-expand-comment-field]': function eventClickExpandCommentField(event, template) {
        commentInputFieldExpandedDict.set(template.data.update._id, true);

        // focus on input
        var input = template.find('[data="commentfield"]');
        Meteor.defer(function(){
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