/*************************************************************/
/* Widget onCreated */
/*************************************************************/
Template.Update.onCreated(function() {
    var template = this;
    template.commentInputFieldExpanded = new ReactiveVar(false);

    template.update = false;
    template.autorun(function() {
        var updates = Updates.find({_id: template.data.updateId});
        var update = updates.fetch()[0];
        template.update = update;
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Update.helpers({
    update: function helperUpdate() {
        return Template.instance().update;
    },
    partupId: function helperPartupId () {
        return Router.current().params._id;
    },
    activityData: function helperActivityData () {
        var update = Template.instance().update;
        if (!update) return;

        var activityId = update.type_data.activity_id;
        return Activities.findOne({_id: activityId});
    },
    isActivityUpdate: function() {
        var update = Template.instance().update;
        if (!update) return;

        return /^partups_activities/.test(update.type) ||
            (update.type === 'partups_comments_added' && !update.type_data.contribution_id);
    },
    isContributionUpdate: function() {
        var update = Template.instance().update;
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
    titleKey: function helperTitleKey() {
        var update = Template.instance().update;
        if (!update) return;

        return 'partupdetail-update-item-type-' + update.type + '-title';
    },

    updateUpper: function helperUpdateUpper() {
        var update = Template.instance().update;
        if (!update) return;

        var user = Meteor.users.findOne({_id: update.upper_id});

        if (user.profile && user.profile.image) {
            user.profile.image = Images.findOne({_id: user.profile.image});
        }

        return user;
    },

    getImageUrlById: function helperGetImageUrlById(imageId) {
        var image = Images.findOne({_id: imageId});
        if (image) return image.url();
        return '';
    },

    commentInputFieldExpanded: function helperCommentInputFieldExpanded () {
        var template = Template.instance();
        if (!template.update) return;

        var commentsPresent = template.update.comments && template.update.comments.length > 0;
        var commentButtonPressed = template.commentInputFieldExpanded.get();
        return commentsPresent || commentButtonPressed;
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
