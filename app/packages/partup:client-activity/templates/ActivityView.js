/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.ActivityView.onCreated(function() {
    this.expanded = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.ActivityView.helpers({
    commentsCount: function() {
        var update = Updates.findOne({_id: this.activity.update_id});
        if (!update) return;
        return update.comments_count;
    },
    contributions: function() {
        if (this.contribution_id) {
            return Contributions.find({_id: this.contribution_id});
        }

        if (!this.activity) return;
        return Contributions.find({activity_id: this.activity._id, archived: {$ne: true}});
    },
    expanded: function() {
        return this.EXPANDED || (Template.instance().expanded.get() && !!this.CONTRIBUTIONS);
    },
    showChevron: function() {
        return this.CONTRIBUTIONS && !this.EXPANDED && !this.contribution_id;
    },
    showEditButton: function() {
        return !this.READONLY && this.isUpper;
    },
    showMetaData: function() {
        return (this.activity && this.activity.end_date) || this.COMMENTS_LINK;
    },
    showPlaceholderContribution: function() {
        if (this.contribution_id) return false;

        var user = Meteor.user();
        if (!user) return false;

        contributions = Contributions.find({activity_id: this.activity._id}).fetch();

        for (var i = 0; i < contributions.length; i++) {
            if (contributions[i].upper_id === user._id && !contributions[i].archived) return false;
        }

        return true;
    },
    updateContribution: function() {
        var activityId = this.activity ? this.activity._id : this.activity_id;
        return function(contribution, cb) {
            Meteor.call('contributions.update', activityId, contribution, cb);
        };
    },
    upper: function(event, template) {
        return Meteor.users.findOne({_id: this.upper_id});
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.ActivityView.events({
    'click [data-activity-edit]': function(event, template) {
        template.data.edit.set(true);
    },
    'click [data-activity-expander]': function(event, template) {
        var opened = template.expanded.get();
        template.expanded.set(!opened);
    }
});
