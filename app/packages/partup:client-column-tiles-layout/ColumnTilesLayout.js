Template.ColumnTilesLayout.onCreated(function() {
    this.data.instance._template = this;
});

Template.ColumnTilesLayout.helpers({
    columns: function() {
        return this.instance.columns.get();
    }
});
