/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartuptile.helpers({
    //
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartuptile.events({
    //
});

/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.WidgetPartuptile.onRendered(function () {
    var canvasElm = this.find('canvas.pu-sub-radial');
    if(canvasElm) renderCircle(canvasElm);
});

/*************************************************************/
/* Widget functions */
/*************************************************************/
renderCircle = function renderCircle (canvas) {
    var $canvas = $(canvas);
    var settings = {
        percent: $canvas.data('percent'),
        linewidth: $canvas.data('linewidth'),
        firstcolor: $canvas.data('firstcolor'),
        secondcolor: $canvas.data('secondcolor')
    };

    var ctx = canvas.getContext('2d');
    var imd = null;
    var circ = Math.PI * 2;
    var quart = circ / 4;
    var endingAngle = ((circ) * settings.percent / 100) - quart;
    var convertedLinewidth = settings.linewidth * 3.4;

    // Arc 1
    ctx.beginPath();
    ctx.arc(320, 320, 320 - convertedLinewidth / 2, -(quart), endingAngle, false);
    ctx.strokeStyle = settings.firstcolor;
    ctx.lineWidth = convertedLinewidth;
    ctx.stroke();
    ctx.closePath();

    // Arc 2
    ctx.beginPath();
    ctx.arc(320, 320, 320 - convertedLinewidth / 2, endingAngle, -(quart), false);
    ctx.strokeStyle = settings.secondcolor;
    ctx.lineWidth = convertedLinewidth;
    ctx.stroke();
    ctx.closePath();
};