Template.PartupToggler.onCreated(function() {
    var template = this;

    template.expanded = new ReactiveVar(false);
});

Template.PartupToggler.events({
    'click [data-toggle]': function(event, template) {
        event.preventDefault();

        template.expanded.set(!template.expanded.curValue);
    },
});

Template.PartupToggler.helpers({
    state: function() {
        var template = Template.instance();
        return {
            expanded: function() {
                return template.expanded.get();
            },
        };
    }
});
