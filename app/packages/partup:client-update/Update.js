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
 */
// jscs:enable

/*************************************************************/
/* Widget onCreated */
/*************************************************************/
Template.Update.onCreated(function() {
    var template = this;
    template.commentInputFieldExpanded = new ReactiveVar(false);

    // Make it reactive
    template.update = new ReactiveVar(false);
    template.autorun(function() {
        var updates = Updates.find({_id: template.data.updateId});
        var update = updates.fetch()[0];
        template.update.set(update);
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Update.helpers({
    update: function helperUpdate() {
        return Template.instance().update.get();
    },
    partupId: function helperPartupId () {
        return Router.current().params._id;
    },
    activityData: function helperActivityData () {
        var update = Template.instance().update.get();
        if (!update) return;

        var activityId = update.type_data.activity_id;
        return Activities.findOne({_id: activityId});
    },
    isActivityUpdate: function() {
        var update = Template.instance().update.get();
        if (!update) return;

        return /^partups_activities/.test(update.type) ||
            (update.type === 'partups_comments_added' && !update.type_data.contribution_id);
    },
    isContributionUpdate: function() {
        var update = Template.instance().update.get();
        if (!update) return;

        return /^partups_(contributions|ratings)/.test(update.type) ||
            (update.type === 'partups_comments_added' && update.type_data.contribution_id);
    },
    isDetail: function helperIsDetail () {
        return !!Router.current().params.update_id;
    },
    isNotDetail: function helperIsDetail () {
        return !Router.current().params.update_id;
    },
    title: function helperTitle() {
        var titleKey = 'update-type-' + this.metadata.update_type + '-title';

        if (this.metadata.update_type === 'partups_invited') {
            return __(titleKey, this.metadata.invited_name);
        }

        return __(titleKey);
    },
    showCommentButton: function() {
        if (!Meteor.user()) return false;
        var template = Template.instance();
        var update = template.update.get();
        if (!update) return false;

        var expandedOnDefault = template.data.COMMENTS_EXPANDED;
        var commentIsExpanded = template.commentInputFieldExpanded.get();
        var commentsPresent = update.comments && update.comments.length > 0;
        var lastCommentIsSystemMessage = update && update.lastCommentIsSystemMessage();

        return expandedOnDefault ||
            commentIsExpanded ||
            (commentsPresent && !lastCommentIsSystemMessage);
    },

    isUpper: function helperIsUpper () {
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne(Router.current().params._id);
        if (!partup) return false;

        return partup.uppers.indexOf(user._id) > -1;
    }

});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Update.events({
    'click [data-expand-comment-field]': function eventClickExpandCommentField (event, template) {
        template.commentInputFieldExpanded.set(true);
    }
});
