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
