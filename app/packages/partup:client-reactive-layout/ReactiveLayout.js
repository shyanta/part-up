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
var generateColumns = function(totalColumns) {
    var columnArray = [];
    for (var i = 0; i < totalColumns; i++) {
        columnArray.push([]);
    };
    return new ReactiveVar(columnArray);
};

// compare all columns and return the index of the smallest
var getShortestColumnIndex = function(template) {
    var init = true;
    var prevHeight = 0;
    var smallestColumnIndex = 0;

    template.columnElements.each(function(index) {
        var thisHeight = $(this).height();
        if (thisHeight < prevHeight || init) {
            init = false;
            smallestColumnIndex = index;
            prevHeight = thisHeight;
        }
    });

    return smallestColumnIndex;
};

// // compare all columns and return the height of the largest
// var getLargestColumnHeight = function(template) {
//     var prevHeight = 0;
//     var largestColumnHeight;

//     template.columnElements.each(function(item) {
//         var thisHeight = $(this).height();
//         if (thisHeight > prevHeight) {
//             prevHeight = thisHeight;
//             largestColumnHeight = thisHeight;
//         }
//     });
//     return largestColumnHeight;
// };

// var compensateHeight = function(template) {
//     $(template.find('[data-layout]')).height(getLargestColumnHeight(template));
// };

// on created, initializer
Template.ReactiveLayout.onCreated(function() {
    var template = this;
    // Session.set('footerEnabled', false);
    template.resetLayout = function(refreshDate, data) {
        // total tiles rendered
        template.count = 0;

        // total items in items array
        template.total = data.items.length;

        //
        template.refreshDate = refreshDate;

        // create columns Array based on the TOTAL_COLUMNS constante
        template.columns = generateColumns(data.TOTAL_COLUMNS);
    };

    template.resetLayout(template.data.refresh_date, template.data);

    // adds tile to the reactive layout
    template.addTile = function() {
        // abort if there is no next item
        if (!template.data.items[template.count + 1]) return;

        // increment count when the item exists
        template.count++;

        // index of the smallest rendered column
        var index = getShortestColumnIndex(template);

        // column array
        var columnData = template.columns.get();

        // add the item to the smallest column
        columnData[index].push(template.data.items[template.count]);

        // update column array reactive var
        template.columns.set(columnData);
    };

    // when a ReactiveTile is rendered, the onTileRender is fired
    template.onTileRender = function() {
        template.addTile();
    };
});

// when the template is rendered
Template.ReactiveLayout.onRendered(function() {
    var template = this;

    // by now the column elements are rendered, find all for use later on
    template.columnElements = $(template.findAll('[data-layout] > ul'));

    template.initialize = function(refreshDate, data) {
        template.resetLayout(refreshDate, data);

        // add the first column
        var columnData = template.columns.get();
        columnData[0].push(data.items[0]);
        template.columns.set(columnData);
    };

    template.initialize(template.data.refresh_date, template.data);

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
    onTileRender: function() {
        return Template.instance().onTileRender;
    }
});
