/**
 * ReactiveLayout
 * a layout system similar to Pinterest
 *
 * @param {array} items             Array of items to be rendered
 * @param {number} TOTAL_COLUMNS    the total number of columns the layout consists of
 * @param {string} COLUMN_CLASS     the classname of each column <ul>
 * @param {string} ITEM_TEMPLATE    template name for each tile in the layout
 * @param {string} ITEM_DATA_KEY    namespace for each item in items (each partup in partups)
 */

Template.ReactiveLayout.onCreated(function() {
    var template = this;

    // create columns Array based on the TOTAL_COLUMNS constante
    var columnArray = [];
    for (var i = 0; i < template.data.TOTAL_COLUMNS; i++) {
        columnArray.push([]);
    };
    template.columns = new ReactiveVar(columnArray);

    // when count ReactiveVar is changed, this is fired
    var onCountUpdate = function(oldValue, newValue) {
        if (oldValue === newValue) return;
        if (!template.data.items[newValue]) return;
        addToReactiveLayout(template, template.data.items[newValue]);
    };
    // init value set to -1, when set to 0 the first item will be rendered
    template.count = new ReactiveVar(-1, onCountUpdate);

    // increments the count ReactiveVar by 1 to render the next item
    template.addNextItem = function() {
        var current = template.count.get();
        if (template.data.items[current + 1]) {
            current++;
            template.count.set(current);
        }
    };

    // totalItems ReactiveVar, is updated when new items are added to the items array
    template.totalItems = new ReactiveVar(0, function(oldValue, newValue) {
        if (oldValue === newValue) return;
        template.addNextItem();
    });

    // when a ReactiveTile is rendered, the onRenderCallback is fired
    template.onRenderCallback = function() {
        template.addNextItem();
    };
});

Template.ReactiveLayout.onRendered(function() {
    var template = this;

    // start rendering tiles
    template.addNextItem();

    // this autorun runs when the template data object changes
    template.autorun(function() {
        var data = Template.currentData();
        if (data.items) {
            // update totalItems ReactiveVar
            template.totalItems.set(data.items.length);
        }
    });
});

// compare all columns and return the index of the smallest
var getShortestColumn = function(elements) {
    var init = true;
    var prevHeight = 0;
    var smallestColumnIndex = 0;

    // compare the height of each column
    $(elements).each(function(index) {
        var thisHeight = $(this).height();

        if (thisHeight < prevHeight || init) {
            init = false;
            smallestColumnIndex = index;
            prevHeight = thisHeight;
        }
    });

    return smallestColumnIndex;
};

// adds an item to the lowest(smallest) column in the reactive layout
var addToReactiveLayout = function(template, item) {
    // finds all generated columns in the template
    var columnElements = template.findAll('[data-layout] > ul');

    // the columns array ReactiveVar
    var columnData = template.columns.get();

    // find smallest column
    var lowestColumn = getShortestColumn(columnElements);

    // add the item to the smallest column
    columnData[lowestColumn].push(item);

    // update
    template.columns.set(columnData);
};

Template.ReactiveLayout.helpers({
    columns: function() {
        return Template.instance().columns.get();
    },
    columnClass: function() {
        return Template.instance().data.COLUMN_CLASS;
    },
    templateName: function() {
        return Template.instance().data.ITEM_TEMPLATE;
    },
    templateData: function() {
        var dataObj = {};
        dataObj[Template.instance().data.ITEM_DATA_KEY] = this;
        return dataObj;
    },
    onRenderCallback: function() {
        return Template.instance().onRenderCallback;
    }
});
