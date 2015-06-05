Template.ReactiveLayout.onCreated(function() {
    var template = this;

    // set the column data
    var columnArray = [];
    for (var i = 0; i < template.data.columns; i++) {
        columnArray.push([]);
    };

    template.columns = new ReactiveVar(columnArray);

    template.count = new ReactiveVar(-1, function(a, b) {
        if (a !== b) {
            if (template.data.items[b]) {
                addToLayout(template, template.data.items[b], function() {

                });
            }
        }
    });

    template.onRenderCallback = function() {
        var current = template.count.get();
        if (template.data.items[current + 1]) {
            current++;
            template.count.set(current);
        }
    };
});

Template.ReactiveLayout.onRendered(function() {
    var template = this;
    console.log(template);
    // template.data.items = template.data.items;

    var current = template.count.get();
    current++;

    template.count.set(current);

    // template.autorun(function() {
    //     template.data.items
    // });
});

// compare all columns and return the index of the smallest
var getShortestColumn = function(elements) {
    var prevHeight = 800 * 800;
    var smallestIndex = 0;

    $(elements).each(function(index) {
        var thisHeight = $(this).height();
        // console.log(thisHeight, prevHeight);

        if (thisHeight < prevHeight) {
            smallestIndex = index;
            prevHeight = thisHeight;
        }
    });
    return smallestIndex;
};

var addToLayout = function(template, item, callBack) {
    var columnElements = template.findAll('ul');
    var columnData = template.columns.get();

    var lowestColumn = getShortestColumn(columnElements);
    columnData[lowestColumn].push(item);

    template.columns.set(columnData);

    callBack();
};

Template.ReactiveLayout.helpers({
    columns: function() {
        return Template.instance().columns.get();
    },
    columnClass: function() {
        return Template.instance().data.columnClass;
    },
    templateName: function() {
        return Template.instance().data.templateName;
    },
    templateData: function() {
        var dataObj = {};
        dataObj[Template.instance().data.templateDataKey] = this;
        return dataObj;
    },
    onRenderCallback: function() {
        return Template.instance().onRenderCallback;
    }
});

Template.ReactiveLayout.events({

});
