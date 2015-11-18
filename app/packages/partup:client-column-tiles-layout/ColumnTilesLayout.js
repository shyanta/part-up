Template.ColumnTilesLayout.onCreated(function() {
    this.data.instance._template = this;
});

Template.ColumnTilesLayout.helpers({
    columns: function() {
        return this.instance.columns.get();
    },
    heightMeasurementQueue: function() {
        return this.instance.heightMeasurementQueue.get();
    }
});

Template.ColumnTilesLayout_TileMeasurement.onRendered(function() {
    var height = $(this.firstNode).outerHeight();

    this.data.myHeightIs(height);
});
