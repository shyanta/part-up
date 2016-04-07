Template.SearchInput.onCreated(function() {
    var template = this;
    var settings = template.data.inputSettings;
    template.searchQuery = settings.reactiveSearchQuery;
    template.label = settings.reactiveLabel;

});

Template.SearchInput.helpers({
    data: function() {
        var template = Template.instance();
        return {
            searchQuery: function() {
                return template.searchQuery.get();
            },
            label: function() {
                return template.label.get();
            }
        };
    }
});

Template.SearchInput.events({
    'input [data-search]': function(event, template) {
        template.searchQuery.set(event.target.value);
    },
    'focus [data-search]': function(event, template) {
        $(event.currentTarget).closest('form').addClass('pu-state-active');
    },
    'blur [data-search]': function(event, template) {
        if (!template.searchQuery.get()) $(event.currentTarget).closest('form').removeClass('pu-state-active');
    },
});
