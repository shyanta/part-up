/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetActivityView.onCreated(function(){
    this.expanded = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetActivityView.helpers({
    expanded: function(){
        return this.EXPANDED || (Template.instance().expanded.get() && !!this.CONTRIBUTIONS);
    },
    commentsCount: function(){
        var update = Updates.findOne({ _id: this.activity.update_id });
        if (!update) return;
        return update.comments_count;
    },
    contributions: function(){
        return Contributions.find({ activity_id: this.activity._id });
    },
    showMetaData: function(){
        return this.activity.end_date || this.COMMENTS_LINK;
    },
    showPlaceholderContribution: function(){
        var user = Meteor.user();
        if (!user) return false;

        contributions = Contributions.find({ activity_id: this.activity._id }).fetch();

        for (var i = 0; i < contributions.length; i++){
            if (contributions[i].upper_id === user._id) return false;
        }

        return true;
    },
    updateContribution: function(){
        var activityId = this.activity ? this.activity._id : this.activity_id;
        return function(contribution, cb){
            Meteor.call('contribution.update', activityId, contribution, cb);
        };
    },
    upper: function(event, template){
        return Meteor.users.findOne({ _id: this.upper_id });
    },
    showEditButton: function () {
        return !this.READONLY;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetActivityView.events({
    'click [data-activity-edit]': function(event, template){
        template.data.edit.set(true);
    },
    'click [data-expander]': function(event, template){
        var opened = template.expanded.get();
        template.expanded.set(!opened);
    }
});
