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
    template.showCommentClicked = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Update.helpers({
    update: function() {
        var self = this;
        var template = Template.instance();
        var updateId = template.data.updateId;
        if (!updateId) return; // no updateId found, return
        var update = Updates.findOne({_id: updateId});
        if (!update) return; // no update found, return
        var partup = Partups.findOne({_id: update.partup_id});
        var activity = Activities.findOne({_id: update.type_data.activity_id});
        var contribution = Contributions.findOne({_id: update.type_data.contribution_id});
        var contributor;
        if (contribution) {
            contributor = Meteor.users.findOne(contribution.upper_id);
        }
        var user = Meteor.user();
        return {
            data: function() {
                return update;
            },
            activityData: function() {
                return activity;
            },
            showCommentButton: function() {
                if (template.data.IS_DETAIL) return false;   // check if this is the detail view
                if (update.comments_count) return false;                // check total comments
                if (self.metadata.is_system) return false;              // check if contribution or systemmessage

                return true;
            },
            isDetail: function() {
                return template.data.IS_DETAIL ? true : false;
            },
            isNotDetail: function() {
                return template.data.IS_DETAIL ? false : true;
            },
            title: function() {
                var titleKey = 'update-type-' + self.metadata.update_type + '-title';
                var params = {};

                // Initiator name
                if (get(self, 'metadata.updateUpper')) {
                    params.name = User(self.metadata.updateUpper).getFirstname();
                } else if (self.metadata.is_system) {
                    params.name = 'Part-up';
                }
                // Invited names
                if (get(self, 'metadata.invitee_names')) {
                    if (self.metadata.invitee_names.length == 1) {
                        params.invitee_names = self.metadata.invitee_names[0];
                    } else if (self.metadata.invitee_names.length > 1) {
                        var last_invited_name = self.metadata.invitee_names.pop();
                        var all_invitee_names = self.metadata.invitee_names.join();
                        params.invitee_names = all_invitee_names + ' ' + __('update-general-and') + ' ' + last_invited_name;
                    }
                }

                // Activity title
                if (self.metadata.is_contribution || self.metadata.is_rating) {
                    params.activity = activity.name;
                }

                // Contributor name
                if (self.metadata.is_rating) {
                    params.contributor = User(contributor).getFirstname();
                }

                return __(titleKey, params);
            },
            mayComment: function() {
                return user ? true : false;
            },
            showCommentClicked: function() {
                return template.showCommentClicked.get();
            },
            isUpper: function() {
                if (!user) return false;
                if (!partup) return false;
                return partup.uppers.indexOf(user._id) > -1;
            },
            oldBudget: function() {
                return budgetDisplay(self.old_type, self.old_value);
            },

            newBudget: function() {
                return budgetDisplay(self.new_type, self.new_value);
            },

            messageContent: function() {
                return Partup.client.strings.newlineToBreak(Partup.helpers.mentions.decode(self.new_value));
            },

            systemMessageContent: function() {
                return Partup.client.strings.newlineToBreak(__('update-type-partups_message_added-system-' + self.type + '-content'));
            },

            commentable: function() {
                return !self.metadata.is_contribution && !self.metadata.is_system;
            }
        };
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Update.events({
    'click [data-expand-comment-field]': function(event, template) {
        event.preventDefault();
        var updateId = this.updateId;
        var proceed = function() {
            template.commentInputFieldExpanded.set(true);
            template.showCommentClicked.set(true);

            Meteor.defer(function() {
                var commentForm = template.find('[id=commentForm-' + updateId + ']');
                var field = lodash.find(commentForm, { name: 'content' });
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
    }
});
