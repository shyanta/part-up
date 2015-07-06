// jscs:disable
/**
 * Widget to render a single contribution
 *
 * You can pass the widget a few options which enable various functionalities
 *
 * @module client-contribution
 * @param {Object} contribution         The contribution object to render
 * @param {Object} activity             The contribution object to render
 * @param {Function} updateContribution A function that is executed after the contribution has been updated
 * @param {Boolean} READONLY            Whether the widget should be rendered readonly
 */
// jscs:enable

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.Contribution.onCreated(function() {
    this.showForm = new ReactiveVar(false);
    this.updateContribution = this.data.updateContribution;
    this.submitting = new ReactiveVar(false);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Contribution.helpers({
    formSchema: Partup.schemas.forms.contribution,
    placeholders: Partup.services.placeholders.contribution,
    generateFormId: function() {
        return 'editContributionForm-' + this.contribution._id;
    },
    showForm: function(event, template) {
        return Template.instance().showForm.get();
    },
    addsValue: function() {
        return this.contribution.hours || this.contribution.rate;
    },
    showSplit: function() {
        return this.contribution.hours && this.contribution.rate;
    },
    upper: function(event, template) {
        return Meteor.users.findOne({_id: this.contribution.upper_id});
    },
    upperContribution: function() {
        var user = Meteor.user();
        if (!user) return false;
        return Meteor.user()._id === this.contribution.upper_id;
    },
    canVerifyContribution: function() {
        var user = Meteor.user();
        if (!user) return false;
        var activity = Activities.findOne({_id: this.contribution.activity_id});
        if (!activity) return false;
        var partup = Partups.findOne({_id: activity.partup_id});
        if (!partup) return false;
        userIsPartupper = _.contains(partup.uppers, user._id);
        return this.contribution.verified === false && userIsPartupper;
    },
    ratings: function() {
        return Ratings.find({contribution_id: this.contribution._id});
    },
    submitting: function() {
        return Template.instance().submitting.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.Contribution.events({
    'click [data-contribution-close]': function(event, template) {
        template.showForm.set(false);
    },
    'click .pu-contribution-own': function(event, template) {
        template.showForm.set(true);
    },
    'click [data-contribution-remove]': function(event, template) {
        Meteor.call('contributions.archive', template.data.contribution._id, function(error) {
            if (error) {
                console.error(error);
            }
        });
    },
    'click [data-contribution-accept]': function(event, template) {
        Meteor.call('contributions.accept', template.data.contribution._id, function(error) {
            if (error) {
                console.error(error);
            }
        });
    },
    'click [data-contribution-reject]': function(event, template) {
        Meteor.call('contributions.reject', template.data.contribution._id, function(error) {
            if (error) {
                console.error(error);
            }
        });
    }

});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc) {
        if (!/editContributionForm-/.test(this.formId)) return;

        var template = this.template.parent();

        template.submitting.set(true);

        template.updateContribution(doc, function(error) {
            if (error) {
                console.error(error);
            }

            template.submitting.set(false);
            template.showForm.set(false);
        });
        return false;
    }
});
