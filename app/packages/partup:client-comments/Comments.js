// jscs:disable
/**
 * Widget to render comments and a comment field
 *
 * @module client-commentfield
 * @param {Object} update               The update object containing the comments
 * @param {Number} LIMIT                Limit the amount of comments shown to this number, then add "show more" link
 * @param {Boolean} SHOW_COMMENTS       Show existing comments
 *
 */
// jscs:enable

/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.Comments.onCreated(function() {
    var template = this;
    template.submitting = new ReactiveVar(false);
    template.expanded = new ReactiveVar(false);
    template.buttonActive = new ReactiveVar(false);
    template.showCommentClicked = new ReactiveVar(false);
    template.showSystemMessages = new ReactiveVar(false);

    template.LIMIT = template.data.LIMIT || 0;
    template.showComments = template.data.SHOW_COMMENTS === undefined ||
        template.data.SHOW_COMMENTS === true;

    template.messageRows = new ReactiveVar(1);
    template.tooManyCharacters = new ReactiveVar(false);

    template.updating = new ReactiveVar(false);
    template.editCommentId = new ReactiveVar();
    template.formId = new ReactiveVar('commentForm-' + template.data.update._id);

    template.resetEditForm = function() {
        if (template.updateMentionsInput) template.updateMentionsInput.destroy();
        template.editCommentId.set(false);
    };
});

Template.Comments.onRendered(function() {
    var template = this;
    template.list = template.find('[data-comments-container]');
    template.input = template.find('[name=content]');
    var partupId = template.data.update.partup_id;
    template.mentionsInput = Partup.client.forms.MentionsInput(template.input, partupId);
    Partup.client.elements.onClickOutside([template.list], template.resetEditForm);
});

Template.Comments.onDestroyed(function() {
    var template = this;
    if (template.mentionsInput)  {
        template.mentionsInput.destroy();
    }
    Partup.client.elements.offClickOutside(template.resetEditForm);
});

Template.Comments.helpers({
    showCommentBox: function() {
        var template = Template.instance();

        var authorized = Meteor.user();
        if (!authorized) return false;

        var motivation = (get(template , 'data.type') === 'motivation');
        if (motivation) return true;

        var clicked = this.showCommentClicked || template.showCommentClicked.get();
        if (this.FULLVIEW) {
            // update detail
            return true;
        } else {
            // partup detail
            return clicked;
        }

    },
    commentButtonClicked: function() {
        return this.showCommentClicked || Template.instance().showCommentClicked.get();
    },
    buttonActive: function() {
        return Template.instance().buttonActive.get();
    },
    formSchema: Partup.schemas.forms.updateComment,
    generateFormId: function() {
        return Template.instance().formId.get();
    },
    generateUpdateCommentId: function() {
        return 'updateCommentForm-' + this._id;
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

        var commentsExpanded = Template.instance().expanded.get();
        if (commentsExpanded) return false;

        var limit = Template.instance().LIMIT;
        if (!limit) return false;

        var count = this.update.comments_count;
        if (!count || (count - limit) < 1) return false;

        return true;
    },
    shownComments: function() {
        if (!this.update) return [];
        var allComments = this.update.comments || [];
        var comments;

        var showSystemMessages = Template.instance().showSystemMessages.get();
        if (showSystemMessages) {
            comments = allComments;
        } else {
            comments = lodash.reject(allComments, 'type', 'system');
        }

        var commentsExpanded = Template.instance().expanded.get();
        if (commentsExpanded) return comments;

        var limit = Template.instance().LIMIT;
        if (!limit) return comments;

        return comments.slice(-limit);
    },
    commentCount: function() {
        var allComments = this.update.comments || [];
        return lodash.reject(allComments, 'type', 'system').length;
    },
    systemCount: function() {
        var allComments = this.update.comments || [];
        return lodash.filter(allComments, 'type', 'system').length;
    },
    content: function() {
        return Partup.helpers.mentions.decode(this.content);
    },
    systemMessage: function(content) {
        return __('comment-field-content-' + content);
    },
    showSystemMessages: function() {
        return Template.instance().showSystemMessages.get() && this.FULLVIEW;
    },
    submitting: function() {
        return Template.instance().submitting.get();
    },
    isSystemMessage: function() {
        return this.type === 'system' || this.system;
    },
    isMotivation: function() {
        return this.type === 'motivation';
    },
    partup: function() {
        return Partups.findOne(this.update.partup_id);
    },
    messageRows: function() {
        return Template.instance().messageRows.get();
    },
    messageTooLong: function() {
        return Template.instance().tooManyCharacters.get();
    },
    newComments: function(upper_data) {
        upper_data = upper_data.hash.upper_data;
        var newComments = [];
        upper_data.forEach(function(upperData) {
            if (upperData._id === Meteor.userId()) {
                newComments = upperData.new_comments;
            }
        });
        return newComments.length;
    },
    fullView: function() {
        return this.fullView;
    },
    imageForComment: function() {
        var commentImage = Images.findOne(this.creator.image);
        if (commentImage) {
            return this.creator.image;
        } else {
            commentUser = Meteor.users.findOne(this.creator._id);
            if (commentUser) {
                return commentUser.profile.image;
            } else {
                return '';
            }
        }
    },
    editCommentId: function() {
        return Template.instance().editCommentId.get();
    }
});

Template.Comments.events({

    'click [data-expand-comments]': function(event, template) {
        event.preventDefault();
        var updateId = this.update._id;
        var proceed = function() {
            template.showCommentClicked.set(true);

            Meteor.defer(function() {
                var commentForm = template.find('[id=commentForm-' + updateId + ']');
                var field = lodash.find(commentForm, {name: 'content'});
                if (field) field.focus();
            });
        };
        if (Meteor.user()) {
            proceed();
        } else {
            Intent.go({route: 'login'}, function() {
                if (Meteor.user()) {
                    proceed();
                } else {
                    this.back();
                }
            });
        }
    },

    'click [data-toggle-systemmessages]': function(event, template) {
        event.preventDefault();

        template.showSystemMessages.set(!template.showSystemMessages.get());
    },

    'keydown [data=commentfield]': function(event, template) {
        var totalCharacters = event.currentTarget.value.length;
        if (totalCharacters > 1000) {
            template.tooManyCharacters.set(true);
        } else {
            template.tooManyCharacters.set(false);
        }

        if (event.keyCode === 8 || event.keyCode === 46) {
            if (template.tooManyCharacters.get()) AutoForm.validateForm('commentForm-' + template.data.update._id);
        }

        var pressedKey = event.which ? event.which : event.keyCode;
        if (pressedKey == 13 && !event.shiftKey) {
            event.preventDefault();
            if (template.submitting.get() != true) {
                $('#commentForm-' + template.data.update._id).submit();
            }
            return false;
        }

    },
    'input [data=commentfield]': function(event, template) {
        template.buttonActive.set(!!event.currentTarget.value);

        if (event.currentTarget.offsetHeight < event.currentTarget.scrollHeight) {
            template.messageRows.set(template.messageRows.get() + 1);
        }
    },
    'click [data-edit-comment]': function(event, template) {
        event.preventDefault();
        template.editCommentId.set(this._id);
        if (template.updateMentionsInput) template.updateMentionsInput.destroy();
        Meteor.defer(function() {
            var input = template.find('[data-update-comment]');
            template.updateMentionsInput = Partup.client.forms.MentionsInput(input, template.data.update.partup_id);
            input.focus();
        });
    }

});

AutoForm.addHooks(null, {
    onSubmit: function(insertDoc) {
        console.log('submit');
        var self = this;
        var template = self.template.parent();
        var formId = template.formId.get();
        self.event.preventDefault();
        if (formId !== self.formId) {
            var formNameParts = self.formId.split('-');
            if (formNameParts.length !== 2 || formNameParts[0] !== 'updateCommentForm') return;
            var commentId = formNameParts[1];
            template.updating.set(true);
            console.log(insertDoc);
            template.updateMentionsInput.destroy();
            template.mentionsInput.reset();
            // insertDoc.content = template.mentionsInput.getValue();
        } else {

            var formNameParts = self.formId.split('-');
            if (formNameParts.length !== 2 || formNameParts[0] !== 'commentForm') return;
            var updateId = formNameParts[1];

            template.submitting.set(true);

            if (template.data.type === 'motivation') {
                insertDoc.type = 'motivation';
            }

            insertDoc.content = template.mentionsInput.getValue();

            if (template.data.POPUP) {
                Partup.client.popup.close({
                    success: true,
                    comment: insertDoc
                });
                return false;
            }
            AutoForm.resetForm(self.formId); // reset form before call is successfull
            template.mentionsInput.reset();

            Meteor.call('updates.comments.insert', updateId, insertDoc, function(error, result) {
                template.submitting.set(false);
                if (error) {
                    return Partup.client.notify.error(__('error-method-' + error.reason));
                }
                template.messageRows.set(1);
                template.tooManyCharacters.set(false);

                Partup.client.updates.addUpdateToUpdatesCausedByCurrentuser(updateId);

                template.buttonActive.set(false);
                self.done();
            });
        }

        return false;
    }
});
