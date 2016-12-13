Template.ColumnTilesLayout.onCreated(function() {
    var template = this;
    template.firstBlockSettings = new ReactiveVar(template.data.firstBlockSettings);
    template.rendered = new ReactiveVar(false);
});
Template.ColumnTilesLayout.onRendered(function() {
    var template = this;
    template.rendered.set(true);
    _.defer(function() {
        template.data.instance.initialize(template);
    });
});

Template.ColumnTilesLayout.helpers({
    firstBlockSettings: function() {
        var template = Template.instance();
        return template.firstBlockSettings.get();
    },
    columns: function() {
        if (!this.instance.initialized.get()) return [];
        var columnsArray = this.instance.columns.get();
        var columns = [];
        _.each(columnsArray, function(item, index) {
            return columns[index] = {
                items: item,
                index: index
            };
        });
        return columns;
    },
    rendered: function() {
        return Template.instance().rendered.get();
    },
    columnWidth: function() {
        return (100 / Template.instance().data.instance.columns.get().length).toFixed(1);
    },
    columnWidthCorrection: function() {
        var template = Template.instance();
        var margin = 20;
        var instance = template.data.instance;
        if (!instance.initialized.get()) return (margin * 3) / 4;
        var columnsArray = instance.columns.get();

        return (margin * (columnsArray.length - 1)) / columnsArray.length;
    }
});
