Template.ColumnTilesLayout.onCreated(function() {
    var template = this;
    template.firstBlockSettings = new ReactiveVar(template.data.firstBlockSettings);
});
Template.ColumnTilesLayout.onRendered(function() {
    var template = this;
    this.data.instance._template = this;
});

Template.ColumnTilesLayout.helpers({
    firstBlockSettings: function() {
        var template = Template.instance();
        console.log(template.firstBlockSettings.get())
        return template.firstBlockSettings.get();
    },
    columns: function() {
        return this.instance.columns.get();
    },
    columnWidth: function() {
        return (100 / Template.instance().data.instance.columns.get().length).toFixed(1);
    }
});
