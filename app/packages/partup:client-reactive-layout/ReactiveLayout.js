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
var getShortestColumn = function(template) {
    var init = true;
    var prevHeight = 0;
    var smallestColumnIndex = 0;

    $(template.findAll('[data-layout] > ul')).each(function(index) {
        var thisHeight = $(this).height();
        if (thisHeight < prevHeight || init) {
            init = false;
            smallestColumnIndex = index;
            prevHeight = thisHeight;
        }
    });

    return smallestColumnIndex;
};

// compare all columns and return the height of the largest
var getLargestColumnHeight = function(template) {
    var prevHeight = 0;
    var largestColumnHeight;

    $(template.findAll('[data-layout] > ul')).each(function(item) {
        var thisHeight = $(this).height();
        if (thisHeight > prevHeight) {
            prevHeight = thisHeight;
            largestColumnHeight = thisHeight;
        }
    });
    return largestColumnHeight;
};

var compensateHeight = function(template) {
    $(template.find('[data-layout]')).height(getLargestColumnHeight(template));
};

// on created, initializer
Template.ReactiveLayout.onCreated(function() {
    var template = this;
    // Session.set('footerEnabled', false);
    template.resetLayout = function(refreshDate, data) {
        // create columns Array based on the TOTAL_COLUMNS constante
        var columns = new ReactiveVar([]);
        generateColumns(data.TOTAL_COLUMNS, columns);

        // total tiles rendered
        template.count = 0;
        // total items in items array
        template.total = data.items.length;

        template.refreshDate = refreshDate;

        template.columns = columns;
    };

    template.resetLayout(template.data.refresh_date, template.data);

    // adds tile to the reactive layout
    template.addTile = function() {
        // abort if there is no next item
        if (!template.data.items[template.count + 1]) return;

        // increment count when the item exists
        template.count++;

        // index of the smallest rendered column
        var index = getShortestColumn(template);

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
        // if (data.refresh_date > template.refreshDate) {
        //     console.log('refresh', data);
        //     template.initialize(data.refresh_date, data);
        // }
    });

});

Template.ReactiveLayout.onDestroyed(function() {
    var template = this;
    // Session.set('footerEnabled', true);
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
