Template.ReactiveLayout.onCreated(function(){
    var template = this;
    // set the column data
    template.columns = new ReactiveVar({
        column0: [],
        column1: [],
        column2: [],
        column3: []
    });
});
Template.ReactiveLayout.onRendered(function(){
    var template = this;
    // distribute the items to all the columns
    constructLayout(template, template.data.items.fetch());
});

// compare all columns and return the index of the smallest
var getLowestColumn = function(elements){
    var prevHeight = 800 * 800;
    var smallestIndex = 0;

    $(elements).each(function(index){
        var thisHeight = $(this).height();

        if(thisHeight < prevHeight){
            smallestIndex = index;
        }
        prevHeight = thisHeight;
    });
    return smallestIndex;
};
var constructLayout = function(template, items){
    var total = items.length;
    var current = 0;

    var loop = function(){
        if(items[current]){
            
            addToLayout(template, items[current], function(){
                current++;
                loop();
            });
        }
    }
    loop();
};
var addToLayout = function(template, item, callBack){
    var columnElements = template.findAll('ul');
    var columnData = template.columns.get();

    var lowestColumn = getLowestColumn(columnElements);
    columnData['column' + lowestColumn].push(item);

    template.columns.set(columnData);

    // this is the nasty unrelyable bit, 
    // I need to find a way to loop without depending on render speed
    //
    Meteor.setTimeout(function(){
        callBack();
    },100)
};

Template.ReactiveLayout.helpers({
    columns: function(){
        return Template.instance().columns.get();
    }
});

Template.ReactiveLayout.events({

});