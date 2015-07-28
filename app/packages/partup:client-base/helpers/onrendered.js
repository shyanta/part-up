// adds a reactive var that is true when a template
// is rendered usefull for helpers that need to fire on render
Template.onCreated(function() {
    this.partupTemplateIsRendered = new ReactiveVar(false);
});
Template.onRendered(function() {
    var template = this;
    Meteor.setTimeout(function() {
        template.partupTemplateIsRendered.set(true);
    }, 500);
});
Template.onDestroyed(function() {
    this.partupTemplateIsRendered.set(false);
});
