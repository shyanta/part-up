/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetContribution.onCreated(function(){
    this.showForm = new ReactiveVar(false);
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
        return false;
    }
});
