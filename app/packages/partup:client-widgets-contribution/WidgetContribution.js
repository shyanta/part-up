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
        Meteor.call('contributions.remove', template.data.contribution._id, function(){
            if (error){
                console.error(err);
            }
        });
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
