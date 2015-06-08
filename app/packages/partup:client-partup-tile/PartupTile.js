/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.PartupTile.helpers({
    partupCover: function () {
        var data = this;
        if (!data) return null;
        var partup = data.partup;
        if (!partup || !partup.image) return null;
        return Images.findOne({ _id: partup.image });
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.PartupTile.events({
    //
});

/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.PartupTile.onRendered(function() {
    var canvasElm = this.find('canvas.pu-sub-radial');
    if (canvasElm) drawCircle(canvasElm);
});

/*************************************************************/
/* Widget functions */
/*************************************************************/
var drawCircle = function drawCircle (canvas) {
    // jQuery object
    var $canvas = $(canvas);

    // Settings
    var settings = {
        percent: $canvas.data('percent') || 0.000001, // needed to draw Arc 2 when percent = 0
        linewidth: 2,
        firstcolor: '#ffa725',
        secondcolor: '#eeeeee',
        width: $canvas.width(),
        height: $canvas.height()
    };

    // Create context
    var ctx = canvas.getContext('2d');

    // Circle calculations
    var circ = Math.PI * 2;
    var quart = circ / 4;
    var endingAngle = ((circ) * settings.percent / 100) - quart;
    var radius = settings.width / 2;

    // Set canvas dimensions
    canvas.width = settings.width;
    canvas.height = settings.height;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Arc 1
    ctx.beginPath();
    ctx.arc(radius, radius, radius - settings.linewidth / 2, -(quart), endingAngle, false);
    ctx.strokeStyle = settings.firstcolor;
    ctx.lineWidth = settings.linewidth;
    ctx.stroke();
    ctx.closePath();

    // Arc 2
    ctx.beginPath();
    ctx.arc(radius, radius, radius - settings.linewidth / 2, endingAngle, -(quart), false);
    ctx.strokeStyle = settings.secondcolor;
    ctx.lineWidth = settings.linewidth;
    ctx.stroke();
    ctx.closePath();

};
