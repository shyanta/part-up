Template.Activity.onCreated(function(){
    this.editMode = new ReactiveVar(false);
})

Template.Activity.helpers({
    editMode: function(){
        return Template.instance().editMode.get();
    }
})

Template.Activity.events({
    'click [data-toggle-edit-mode]': function editMode(event, template){
        template.editMode.set(!template.editMode.get());
    }
})