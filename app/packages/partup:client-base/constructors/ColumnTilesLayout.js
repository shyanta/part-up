/**
 * Constructor for the column tiles layout
 *
 * @class ColumnTilesLayout
 * @memberof Partup.client
 */
Partup.client.constructors.ColumnTilesLayout = function(options) {
    if (!mout.lang.isObject(options)) {
        throw new Error('ColumnTilesLayout: options is not an object');
    }

    if (!mout.lang.isFunction(options.calculateApproximateTileHeight)) {
        throw new Error('ColumnTilesLayout: options.calculateApproximateTileHeight() not found');
    }

    if (!mout.lang.isNumber(options.columns)) {
        throw new Error('ColumnTilesLayout: options.columns is not a number');
    }

    var C = this;
    var _options = {
        calculateApproximateTileHeight: options.calculateApproximateTileHeight,
        columns: options.columns
    };
    var _tiles = [];
    var _columnElements = [];

    var _createColumns = function(amount) {
        return mout.array.range(0, amount - 1).map(function() {
            return [];
        });
    };

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

    C.columns = new ReactiveVar(_createColumns(_options.columns));

    C.clear = function(callback) {
        _tiles = [];
        C.columns.set(_createColumns(_options.columns));

        Meteor.defer(function() {
            _columnElements = C._template.$('[data-column]');
            if (mout.lang.isFunction(callback)) {
                callback.call(C);
            }
        });
    };

    C.addTiles = function(tiles) {
        _tiles = _tiles.concat(tiles);
        var columns = C.columns.get();
        var columnHeights = _measureColumnHeights();

        tiles.forEach(function(tile) {
            var shortestColumn = columnHeights.indexOf(mout.array.min(columnHeights));
            var tileHeight = _options.calculateApproximateTileHeight(tile, _columnElements.eq(0).width());

            columnHeights[shortestColumn] += tileHeight;
            columns[shortestColumn].push(tile);
        });

        C.columns.set(columns);
    };

    C.changeColumns = function(amount, callback) {
        var tilesBackup = _tiles;
        _options.columns = amount;
        C.clear(function callback() {
            C.addTiles(tilesBackup);

            if (mout.lang.isFunction(callback)) {
                callback.call(C);
            }
        });
    };
};
