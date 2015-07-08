/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.ActivityView.onCreated(function() {
    var tpl = this;

    tpl.expanded = new ReactiveVar(!!tpl.data.EXPANDED);

    tpl.updateContribution = function(contribution, cb) {
        var activityId = tpl.data.activity ? tpl.data.activity._id : tpl.data.activity_id;
        Meteor.call('contributions.update', activityId, contribution, cb);
    };
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
        if (!this.activity || this.contribution_id) return;

        return Contributions.find({activity_id: this.activity._id, archived: {$ne: true}}).fetch();
    },
    contribution: function() {
        if (!this.contribution_id) return;

        return Contributions.findOne({_id: this.contribution_id});
    },
    expanded: function() {
        return Template.instance().expanded.get();
    },
    showChevron: function() {
        return this.EXPANDABLE && !Template.instance().expanded.get() && !this.contribution_id;
    },
    showEditButton: function() {
        return !this.READONLY && this.isUpper && Template.instance().expanded.get();
    },
    showMetaData: function() {
        return (this.activity && this.activity.end_date) || this.COMMENTS_LINK;
    },
    showShareButton: function() {
        if (this.contribution_id) return false;
        if (this.READONLY) return false;

        var user = Meteor.user();
        if (!user) return false;

        return true;
    },
    showContributeButton: function() {
        if (this.contribution_id) return false;
        if (this.READONLY) return false;

        var user = Meteor.user();
        if (!user) return false;

        var contributions = Contributions.find({activity_id: this.activity._id}).fetch();
        for (var i = 0; i < contributions.length; i++) {
            if (contributions[i].upper_id === user._id && !contributions[i].archived) return false;
        }

        return true;
    },
    updateContribution: function() {
        return Template.instance().updateContribution;
    },
    upper: function(event, template) {
        return Meteor.users.findOne({_id: this.upper_id});
    },
    isReadOnly: function() {
        return Template.instance().data.READONLY;
    },
    update: function() {
        return Updates.findOne({_id: this.updateId || Template.instance().data.activity.update_id});
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
    },
    'click [data-contribute]': function(event, template) {
        event.preventDefault();

        var contribute = function() {
            var partup = Partups.findOne({_id: template.data.activity.partup_id});
            if (!partup) {
                // When this happens, the partup subscription is probably not ready yet
                Partup.client.notify.error('Couldn\'t proceed your contribution. Please try again!');
                return;
            }

            if (!partup.hasUpper(Meteor.user()._id)) {
                Partup.client.popup.open('popup.motivation', function(success) {
                    if (success) {
                        template.updateContribution({}, function(error) {
                            if (error) console.error(error);
                        });
                    }
                });
            } else {
                template.updateContribution({}, function(error) {
                    if (error) console.error(error);
                });
            }
        };

        if (Meteor.user()) {
            contribute();
        } else {
            Partup.client.intent.go({route: 'login'}, function() {
                Partup.client.intent.returnToOrigin('login');
                contribute();
            });
        }
    },
    'click [data-share]': function(event, template) {
        event.preventDefault();
        var partup = Partups.findOne({_id: template.data.activity.partup_id});
        Partup.client.intent.go({
            route: 'partup-invite',
            params: {_id: partup._id} //, update_id: template.data.activity.update_id}
        }, function() {
            Router.go('partup', {_id: partup._id});
        });
    },
});
