/**
 * ColumnsLayout
 * a layout system similar to Pinterest
 *
 * @param {number} COLUMNS     Number of columns
 * @param {string} TEMPLATE    Templatename for each item
 * @param {function} addHook   Function that recieves a callback function from the ColumnsLayout. Save the function and fire it when you want to ADD items
 * @param {function} clearHook Function that recieves a callback function from the ColumnsLayout. Save the function and fire it when you want to CLEAN ALL items
 */

Template.ColumnsLayout.onCreated(function() {
    var tpl = this;

    /**
     * Hydrate item
     */
    var hydrateItem = function(item) {
        item.isRendered = new ReactiveVar(false);
    };

    /**
     * Columns
     */
    tpl.columns = new ReactiveVar();
    var resetColumns = function() {
        var columns = [];
        for (var i = 0; i < tpl.data.COLUMNS; i++) {
            columns.push([]);
        };
        tpl.columns.set(columns);
    };
    resetColumns();

    /**
     * Columns operations
     */
    tpl.columns.queue = [];
    tpl.columns.queue_running = false;
    tpl.columns.queue_next = function() {
        if (tpl.columns.queue_running) tpl.columns.queue.shift();
        tpl.columns.queue_running = true;

        var item = tpl.columns.queue[0];
        if (!item) {
            return tpl.columns.queue_running = false;
        }

        tpl.columns.addToShortestColumn(item);
    };
    tpl.columns.insert = function(items) {
        tpl.columns.queue = tpl.columns.queue.concat(items);
        if (!tpl.columns.queue_running) {
            Meteor.defer(tpl.columns.queue_next);
        };
    };
    tpl.columns.clean = resetColumns;
    tpl.columns.addToShortestColumn = function(item) {
        var shortest = {
            index: null,
            height: Infinity
        };

        $(tpl.findAll('[data-column]')).each(function(index) {
            var myHeight = $(this).outerHeight();

            if (shortest.height > myHeight) {
                shortest.index = index;
                shortest.height = myHeight;
            }
        });

        // Assuming here that the [data-column] indices order equals the tpl.columns indices order
        var columns = tpl.columns.get();
        hydrateItem(item);
        columns[shortest.index].push(item);
        tpl.columns.set(columns);
    };

    /**
     * Register callbacks
     */
    tpl.data.addHook(tpl.columns.insert);
    tpl.data.clearHook(tpl.columns.clean);
});

/**
 * Helpers
 */
Template.ColumnsLayout.helpers({
    columns: function() {
        return Template.instance().columns.get();
    },
    templateName: function() {
        return Template.instance().data.TEMPLATE;
    },
    onItemRendered: function() {
        var tpl = Template.instance();
        var item = this;

        return function() {
            tpl.columns.queue_next();
            item.isRendered.set(true);
        };
    },
    isRendered: function() {
        return this.isRendered.get();
    }
});
