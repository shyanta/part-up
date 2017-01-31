Template.BoardView.onCreated(function() {
    var template = this;
    var partupId = 'hSCFmnoDi4hvmb9GR';

    template.board = {
        _id: 'hfdskfgyu',
        created_at: new Date(),
        partup_id: partupId,
        updated_at: new Date(),
        lanes: ['hfdsail','gfdauyew','hfewyid']
    };

    template.lanes = [{
        _id: 'hfdsail',
        name: 'Backlog',
        board_id: 'hfdskfgyu',
        created_at: new Date(),
        updated_at: new Date(),
        activities: ['tj8M62M52Sa7MwMnZ', 'vAMWQP5vQZzScpQeb', 'X7h7ruFCZr7qtGGez', 'cq5dK2CkZHbsRLsY2', 'kLy8ub6qCytinCGbB']
    },{
        _id: 'gfdauyew',
        name: 'Verify',
        board_id: 'hfdskfgyu',
        created_at: new Date(),
        updated_at: new Date(),
        activities: ['vEoGorDunHjRLrX9v', 'CjvSRHF3afmFbxuY8']
    },{
        _id: 'hfewyid',
        name: 'Done',
        board_id: 'hfdskfgyu',
        created_at: new Date(),
        updated_at: new Date(),
        activities: ['EQoA2RF74qbrzkK9Z', 'SL7z9zCE6PSnfRH4R']
    }];
});

Template.BoardView.onRendered(function() {
    var template = this;
    var boardElement = template.$('[data-sortable-board]')[0];
    Sortable.create(boardElement, {
        // group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
        //sort: true,  // sorting inside list
        //delay: 0, // time in milliseconds to define when the sorting should start
        //disabled: false, // Disables the sortable if set to true.
        //store: null,  // @see Store
        //animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
        //handle: ".my-handle",  // Drag handle selector within list items
        // filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
        draggable: ".pu-js-sortable-lane",  // Specifies which items inside the element should be draggable
        //ghostClass: "sortable-ghost",  // Class name for the drop placeholder
        //chosenClass: "sortable-chosen",  // Class name for the chosen item
        //dragClass: "sortable-drag",  // Class name for the dragging item
        // dataIdAttr: 'data-lane',

        //forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

        //fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
        //fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
        //fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.

        //scroll: true, // or HTMLElement
        //scrollFn: function(offsetX, offsetY, originalEvent) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
        //scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
        //scrollSpeed: 10, // px

        // setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
        //     dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
        // },

        // Element is chosen
        // onChoose: function (/**Event*/evt) {
        //     evt.oldIndex;  // element index within parent
        // },

        // Element dragging started
        // onStart: function (/**Event*/evt) {
        //     evt.oldIndex;  // element index within parent
        // },

        // Element dragging ended
        // onEnd: function (/**Event*/evt) {
        //     evt.oldIndex;  // element's old index within parent
        //     evt.newIndex;  // element's new index within parent
        // },

        // Element is dropped into the list from another list
        // onAdd: function (/**Event*/evt) {
        //     var itemEl = evt.item;  // dragged HTMLElement
        //     evt.from;  // previous list
        //     // + indexes from onEnd
        // },

        // Changed sorting within list
        // onUpdate: function (/**Event*/evt) {
        //     var itemEl = evt.item;  // dragged HTMLElement
        //     // + indexes from onEnd
        // },

        // Called by any change to the list (add / update / remove)
        // onSort: function (/**Event*/evt) {
        //     // same properties as onUpdate
        // },

        // Element is removed from the list into another list
        // onRemove: function (/**Event*/evt) {
        //     // same properties as onUpdate
        // },

        // Attempt to drag a filtered element
        // onFilter: function (/**Event*/evt) {
        //     var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
        // },

        // Event when you move an item in the list or between lists
        // onMove: function (/**Event*/evt, /**Event*/originalEvent) {
        //     // Example: http://jsbin.com/tuyafe/1/edit?js,output
        //     evt.dragged; // dragged HTMLElement
        //     evt.draggedRect; // TextRectangle {left, top, right и bottom}
        //     evt.related; // HTMLElement on which have guided
        //     evt.relatedRect; // TextRectangle
        //     originalEvent.clientY; // mouse position
        //     // return false; — for cancel
        // },

        // Called when creating a clone of element
        // onClone: function (/**Event*/evt) {
        //     var origEl = evt.item;
        //     var cloneEl = evt.clone;
        // }
    });
    var lanes = [];
    template.$('[data-sortable-lane]').each(function(index, item) {
        var laneName = $(item).data('lane');
        lanes.push(laneName);
    });

    var laneElements = template.$('[data-sortable-lane]').each(function(index, item) {
        var laneName = $(item).data('lane');
        Sortable.create(item, {
            group: {
                name: laneName,
                pull: lanes,
                put: lanes
            },
            draggable: ".pu-js-sortable-card"
        });
    });

});

Template.BoardView.helpers({
    lanes: function() {
        var template = Template.instance();

        return (template.board.lanes || []).map(function(laneId, index) {
            var lane = lodash.find(template.lanes, {_id: laneId});

            lane.activities = (lane.activities || []).map(function(activityId) {
                return Activities.findOne(activityId);
            }).filter(function(activity) { return !!activity; });

            return lane;
        });
    }
});

