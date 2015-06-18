// jscs:disable
/**
 * Widget to render an update
 *
 * You can pass the widget a few options which enable various functionalities
 *
 * @param {String} updateId             The update id of the update that has to be rendered
 * @param {Object} metadata             ?
 * @param {Boolean} LINK                Show link yes or no
 * @param {Boolean} COMMENTS_EXPANDED   show all comments (don't show "show more comments" link)
 * @param {Boolean} FORCE_COMMENTFORM   always show the comment form
 */
// jscs:enable
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
    isActivityUpdate: function() {
        var update = Updates.findOne({_id: this.updateId});
        if (!update) return;

        return /^partups_activities/.test(update.type) ||
            (update.type === 'partups_comments_added' && !update.type_data.contribution_id);
    },
    isContributionUpdate: function() {
        var update = Updates.findOne({_id: this.updateId});
        if (!update) return;

        return /^partups_(contributions|ratings)/.test(update.type) ||
            (update.type === 'partups_comments_added' && update.type_data.contribution_id);
    },
    isDetail: function() {
        return !!Template.instance().data.updateId;
    },
    isNotDetail: function() {
        return !Template.instance().data.updateId;
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

        var partup = Partups.findOne(Template.instance().data.updateId);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    }

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Update.events({
    'click [data-expand-comment-field]': function(event, template) {
        template.commentInputFieldExpanded.set(true);
    }
});
