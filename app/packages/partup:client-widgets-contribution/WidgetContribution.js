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
        return 'addContribution';
    },
    showForm: function(event, template){
        return Template.instance().showForm.get();
    },
    showSplit: function(){
        return this.contribution.hours && this.contribution.rate;
    },
    upper: function(event, template){
        var upper = Meteor.users.findOne({ _id: this.contribution.upper_id });
        return upper;
    },
    upperContribution: function(){
        return Meteor.user()._id === this.contribution.upper_id;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetContribution.events({
    'click .pu-contribution-placeholder': function(event, template){
        template.showForm.set(true);
    },
    'click [data-contribution-close]': function(event, template){
        template.showForm.set(false);
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc){
        var template = this.template.parentTemplate();
        template.updateContribution(doc, function(error){
            if (error){
                console.error(error);
            }
        });
        return false;
    }
});
