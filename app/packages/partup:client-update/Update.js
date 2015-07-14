// jscs:disable
/**
 * Widget to render an update
 *
 * You can pass the widget a few options which enable various functionalities
 *
 * @module client-update
 * @param {String} updateId             The update id of the update that has to be rendered
 * @param {Object} metadata             Non reactive metadata, such as user, time and title
 * @param {Boolean} LINK                Show link yes or no
 * @param {Boolean} SHOW_COMMENTS       Show existing comments
 * @param {Boolean} COMMENT_LIMIT       Limit the amount of comments expanded (0 for no limit, default)
 * @param {Boolean} FORCE_COMMENTFORM   always show the comment form
 */
// jscs:enable

/*************************************************************/
/* Helper functions */
/*************************************************************/
var budgetDisplay = function(type, value) {
    if (type === 'money') {
        return __('update-budget-type-money', value);
    } else if (type === 'hours') {
        return __('update-budget-type-hours', value);
    }

    return __('update-budget-type-none');
};

/*************************************************************/
/* Widget created */
/*************************************************************/
Template.Update.onCreated(function() {
    var template = this;
    template.commentInputFieldExpanded = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Update.helpers({
    update: function() {
        var update = Updates.findOne({_id: this.updateId});
        return update;
    },
    activityData: function() {
        var updateId = Template.instance().data.updateId;
        var update = Updates.findOne({_id: updateId});
        if (!update) return;

        var activityId = update.type_data.activity_id;
        return Activities.findOne({_id: activityId});
    },
    isDetail: function() {
        return !!Template.instance().data.IS_DETAIL;
    },
    isNotDetail: function() {
        return !Template.instance().data.IS_DETAIL;
    },
    title: function() {
        var titleKey = 'update-type-' + this.metadata.update_type + '-title';

        if (this.metadata.update_type === 'partups_invited') {
            return __(titleKey, this.metadata.invited_name);
        }

        return __(titleKey);
    },

    showCommentForm: function() {
        var update = Updates.findOne({_id: this.updateId});
        if (!update) return;

        var template = Template.instance();
        var commentsPresent = update.comments && update.comments.length > 0;
        var commentButtonPressed = template.commentInputFieldExpanded.get();
        var lastCommentIsSystemMessage = update && update.lastCommentIsSystemMessage();
        return (commentsPresent && !lastCommentIsSystemMessage) ||
            commentButtonPressed ||
            template.data.FORCE_COMMENTFORM;
    },

    isUpper: function() {
        var user = Meteor.user();
        if (!user) return false;

        var updateId = Template.instance().data.updateId;
        if (!updateId) return false;

        var update = Updates.findOne({_id: updateId});
        if (!update) return false;

        var partup = Partups.findOne({_id: update.partup_id});
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    },

    oldBudget: function() {
        return budgetDisplay(this.old_type, this.old_value);
    },

    newBudget: function() {
        return budgetDisplay(this.new_type, this.new_value);
    },

    systemMessage: function(type) {
        return __('update-type-partups_message_added-system-' + type + '-content');
    },

    commentable: function() {
        return !this.metadata.is_contribution && !this.metadata.is_system;
    }

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Update.events({
    'click [data-expand-comment-field]': function(event, template) {
        template.commentInputFieldExpanded.set(true);
        var updateId = this.updateId;

        Meteor.defer(function() {
            var commentForm = template.find('[id=commentForm-' + updateId + ']');
            var field = lodash.find(commentForm, {name: 'content'});
            field.focus();
        });
    }
});
