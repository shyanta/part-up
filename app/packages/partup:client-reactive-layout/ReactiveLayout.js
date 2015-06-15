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

 // generates a reactive column array based on TOTAL_COLUMNS constante
var generateColumns = function(totalColumns, reactiveColumnsArray) {
    var columnArray = reactiveColumnsArray.get();
    for (var i = 0; i < totalColumns; i++) {
        columnArray.push([]);
    };
    reactiveColumnsArray.set(columnArray);
};

// compare all columns and return the index of the smallest
var getShortestColumn = function(elements) {
    var init = true;
    var prevHeight = 0;
    var smallestColumnIndex = 0;

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

// on created, initializer
Template.ReactiveLayout.onCreated(function() {
    var template = this;

    // create columns Array based on the TOTAL_COLUMNS constante
    template.columns = new ReactiveVar([]);
    generateColumns(template.data.TOTAL_COLUMNS, template.columns);

    // total tiles rendered
    template.count = 0;
    // total items in items array
    template.total = template.data.items.length;

    // adds tile to the reactive layout
    template.addTile = function() {
        // abort if there is no next item
        if (!template.data.items[template.count + 1]) return;

        // increment count when the item exists
        template.count++;

        // find all rendered uls in data-layout
        var columnElements = template.findAll('[data-layout] > ul');

        // index of the smallest rendered column
        var index = getShortestColumn(columnElements);

        // column array
        var columnData = template.columns.get();

        // add the item to the smallest column
        columnData[index].push(template.data.items[template.count]);

        // update column array reactive var
        template.columns.set(columnData);
    };

    // when a ReactiveTile is rendered, the onRenderCallback is fired
    template.onRenderCallback = function() {
        template.addTile();
    };
});

// when the template is rendered
Template.ReactiveLayout.onRendered(function() {
    var template = this;

    // add the first column
    var columnData = template.columns.get();
    columnData[0].push(template.data.items[0]);
    template.columns.set(columnData);

    // this autorun runs when the template data object changes
    // if more items are added to the items in the template.data obj
    // kickstart the tile renderer
    template.autorun(function() {
        var data = Template.currentData();
        if (data.items.length > template.total) {
            template.total = data.items.length;
            template.addTile();
        }
    });
});

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
