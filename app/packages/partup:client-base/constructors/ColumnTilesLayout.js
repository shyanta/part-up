/**
 * Constructor for the column tiles layout
 *
 * @class ColumnTilesLayout
 * @memberof Partup.client
 */
Partup.client.constructors.ColumnTilesLayout = function() {
    var C = this;

    var _tiles = [];

    var _createColumns = function(amount) {
        var columns = [];

        for (var i = 0; i < amount; i++) {
            columns.push([]);
        };

        return columns;
    };

    var _columnElements = [];

    var _measureColumnHeights = function() {
        if (!_columnElements || !_columnElements.length) {
            throw new Error('ColumnTilesLayout: could not find any columns');
        }

        var heights = [];

        _columnElements.each(function(index) {
            heights[index] = $(this).outerHeight();
        });

        return heights;
    };

    C.heightMeasurementQueue = new ReactiveVar([]);

    C.columns = new ReactiveVar(_createColumns(4));

    C.clear = function() {
        C.columns.set(_createColumns(4));

        Meteor.defer(function() {
            _columnElements = C._template.$('[data-column]');
        });
    };

    C.addTiles = function(tiles, callback) {
        var _tiles = tiles.slice();

        var measuredCount = 0;
        var oneMeasuredCallback = function(height) {
            this.height = height;
            measuredCount ++;

            if (measuredCount === _tiles.length) {
                allMeasuredCallback();
            }
        };

        var allMeasuredCallback = function() {
            C.heightMeasurementQueue.set([]);
            var columns = C.columns.get();

            var columnHeights = _measureColumnHeights();
            _tiles.forEach(function(tile) {
                var shortestColumn = mout.array.min(columnHeights);
                var shortesColumnIndex = columnHeights.indexOf(shortestColumn);

                columnHeights[shortesColumnIndex] += tile.height + 18;
                columns[shortesColumnIndex].push(tile.dataContext);
            });

            C.columns.set(columns);
            callback();
        };

        _tiles = _tiles.map(function(tile) {
            return {
                columnWidth: _columnElements.eq(0).width(),
                dataContext: tile,
                height: 0,
                myHeightIs: oneMeasuredCallback
            };
        });

        C.heightMeasurementQueue.set(_tiles);
    };
};
