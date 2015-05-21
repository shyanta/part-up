/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetContribution.onCreated(function(){
    this.showForm = new ReactiveVar(false);
    this.updateContribution = this.data.updateContribution;
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetContribution.helpers({
    formSchema: Partup.schemas.forms.contribution,
    placeholders: Partup.services.placeholders.contribution,
    generateFormId: function(){
        return 'editContributionForm-' + this.contribution._id;
    },
    showForm: function(event, template){
        return Template.instance().showForm.get();
    },
    addsValue: function(){
        return this.contribution.hours || this.contribution.rate;
    },
    showSplit: function(){
        return this.contribution.hours && this.contribution.rate;
    },
    upper: function(event, template){
        var upper = Meteor.users.findOne({ _id: this.contribution.upper_id });
        return upper;
    },
    upperContribution: function(){
        var user = Meteor.user();
        if (!user) return false;
        return Meteor.user()._id === this.contribution.upper_id;
    },
    canVerifyContribution: function canVerifyContribution() {
        var user = Meteor.user();
        if (!user) return false;
        var activity = Activities.findOne({_id: this.contribution.activity_id});
        if (!activity) return false;
        var partup = Partups.findOne({_id: activity.partup_id});
        if (!partup) return false;
        userIsPartupper = _.contains(partup.uppers, user._id);
        return this.contribution.verified == false && userIsPartupper;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetContribution.events({
    'click .pu-contribution-placeholder': function(event, template){
        template.updateContribution({}, function(error){
            if (error){
                console.error(error);
            }
        });
    },
    'click [data-contribution-close]': function(event, template){
        template.showForm.set(false);
    },
    'click .pu-contribution-own': function(event, template){
        template.showForm.set(true);
    },
    'click [data-contribution-remove]': function(event, template){
        Meteor.call('contributions.remove', template.data.contribution._id, function(error){
            if (error){
                console.error(error);
            }
        });
    },
    'click [data-contribution-accept]': function acceptContribution(event, template) {
        Meteor.call('contributions.accept', template.data.contribution._id, function(error) {
            if (error){
                console.error(error);
            }
        });
    },
    'click [data-contribution-reject]': function rejectContribution(event, template) {
        Meteor.call('contributions.reject', template.data.contribution._id, function(error) {
            if (error){
                console.error(error);
            }
        });
    }

});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc){
        if (!/editContributionForm-/.test(this.formId)) return;

        var template = this.template.parentTemplate();
        template.updateContribution(doc, function(error){
            if (error){
                console.error(error);
            }

            template.showForm.set(false);
        });
        return false;
    }
});
