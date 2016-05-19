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
    'click [data-flexible-center]': function(event, template) {
        $(event.currentTarget).parent().addClass('start');
        $('[data-search]').focus();
        _.defer(function() {
            $(event.currentTarget).parent().addClass('active');
        });
    },
    'focus [data-search]': function(event, template) {
        template.focussed = true;
    },
    'blur [data-search]': function(event, template) {
        if (!$(event.target).val()) {
            template.focussed = false;
            $('[data-flexible-center]').parent().removeClass('active');
        }
    },
    'mouseleave [data-flexible-center]': function(event, template) {
        if (!template.focussed) $(event.currentTarget).parent().removeClass('active');
    },
    'transitionend [data-flexible-center]': function(event, template) {
        $(event.currentTarget).parent().removeClass('start');
    }
});
