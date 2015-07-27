/**
 * ColumnsLayout
 * a layout system similar to Pinterest
 *
 * @module client-columns-layout
 * @param {number} COLUMNS     Number of columns
 * @param {string} TEMPLATE    Templatename for each item
 * @param {function} addHook   Function that recieves a callback function from the ColumnsLayout. Save the function and fire it when you want to ADD items
 * @param {function} clearHook Function that recieves a callback function from the ColumnsLayout. Save the function and fire it when you want to CLEAN ALL items
 *
 * @example
 *
{{> ColumnsLayout
    COLUMNS=4
    TEMPLATE="PartupTile"
    addHook=addToLayoutHook
    clearHook=clearLayoutHook
}}
 *
 */

Template.ColumnsLayout.onCreated(function() {
    var tpl = this;

    /**
     * Items
     */
    var all_items = [];

    /**
     * Hydrate item
     */
    var hydrateItem = function(item) {
        item.isRendered = new ReactiveVar(false);
    };

    /**
     * Columns
     */
    tpl.amount_of_columns = new ReactiveVar(tpl.data.COLUMNS);
    tpl.columns = new ReactiveVar();
    var resetColumns = function() {
        var columns = [];
        for (var i = 0; i < tpl.amount_of_columns.get(); i++) {
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
        all_items = all_items.concat(items);
        return all_items;
    };
    tpl.columns.clean = function() {
        resetColumns();
        all_items = [];
        return all_items;
    };
    tpl.columns.addToShortestColumn = function(item) {
        if (tpl.view.isDestroyed) return;

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
    tpl.columns.rerender = function() {
        if (tpl.amount_of_columns.get() === tpl.data.COLUMNS) return;

        // Cancel the current queue
        tpl.columns.queue = [];
        tpl.columns.queue_running = false;

        // Update the amount of columns variable
        tpl.amount_of_columns.set(tpl.data.COLUMNS);

        // Re-insert all existing items
        var items_backup = all_items;
        tpl.columns.clean();
        Meteor.defer(function() {
            tpl.columns.insert(items_backup);
        });
    };

    /**
     * Register callbacks
     */
    tpl.data.addHook(tpl.columns.insert); // required
    if (tpl.data.clearHook) tpl.data.clearHook(tpl.columns.clean); // optional
    if (tpl.data.rerenderHook) tpl.data.rerenderHook(tpl.columns.rerender); // optional
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
    },
    columnsAmountClass: function() {
        var text = '';
        switch (Template.instance().amount_of_columns.get()) {
            case 1:
                text = 'one';
                break;
            case 2:
                text = 'two';
                break;
            case 3:
                text = 'three';
                break;
            case 4:
                text = 'four';
                break;
            default:
                text = 'four';
                break;
        }
        return text;
    }
});
