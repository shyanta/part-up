/*************************************************************/
/* Widget onCreated */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.onCreated(function () {
    this.commentInputFieldExpanded = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.helpers({
    partupId: function helperPartupId () {
        return Router.current().params._id;
    },
    activityData: function helperActivityData () {
        var activityId = Template.instance().data.update.type_data.activity_id;
        return Activities.findOne({_id: activityId});
    },
    isActivityUpdate: function(){
        return /^partups_activities/.test(this.update.type) ||
            (this.update.type === 'partups_comments_added' && !this.update.type_data.contribution_id);
    },
    isContributionUpdate: function(){
        return /^partups_(contributions|ratings)/.test(this.update.type) ||
            (this.update.type === 'partups_comments_added' && this.update.type_data.contribution_id);
    },
    isDetail: function helperIsDetail (){
        return !!Router.current().params.update_id;
    },
    isNotDetail: function helperIsDetail (){
        return !Router.current().params.update_id;
    },
    titleKey: function helperTitleKey() {
        return 'partupdetail-update-item-type-' + this.update.type + '-title';
    },

    updateUpper: function helperUpdateUpper() {
        var user = Meteor.users.findOne({_id: this.update.upper_id});

        if (user.profile && user.profile.image) {
            user.profile.image = Images.findOne({_id: user.profile.image});
        }

        return user;
    },

    getImageUrlById: function helperGetImageUrlById(imageId) {
        var image = Images.findOne({_id: imageId});
        if(image) return image.url();
        return '';
    },

    commentInputFieldExpanded: function helperCommentInputFieldExpanded () {
        var commentsPresent = this.update.comments && this.update.comments.length > 0;
        var commentButtonPressed = Template.instance().commentInputFieldExpanded.get();
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
Template.WidgetPartupdetailUpdateItem.events({
    'click [data-expand-comment-field]': function eventClickExpandCommentField (event, template) {
        template.commentInputFieldExpanded.set(true);
    }
});
