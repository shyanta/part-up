/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.PartupTile.helpers({
    activityCount: function() {
        return this.partup.activity_count || Activities.find({partup_id: this.partup._id}).count();
    },
    dayCount: function() {
        var created = new Date(this.partup.created_at);
        var now = new Date();
        return Math.ceil(((((now - created) / 1000) / 60) / 60) / 24);
    },
    supporterCount: function() {
        if (!this.partup.supporters) return 0;
        return this.partup.supporters.length;
    },
    partupProgress: function() {
        var day = 24 * 60 * 60 * 1000;
        var now = new Date();
        var createdAt = new Date(this.partup.created_at);
        var endsAt = new Date(this.partup.end_date);

        var daysLeft = Math.round(Math.abs((now.getTime() - endsAt.getTime())/day));
        var daysPast = Math.round(Math.abs((createdAt.getTime() - now.getTime())/day));

        return (daysPast / (daysLeft + daysPast)) * 100;
    },
    tags: function() {
        if (!this.partup.tags) return;

        var tags = [];
        for (var i = 0; i < this.partup.tags.length; i++) {
            tags.push({
                tag: this.partup.tags[i],
                delay: .075 * i
            });
        }

        return tags;
    },
    upper: function() {
        return Meteor.users.findOne({_id: this._id});
    },
    uppers: function() {
        if (!this.partup || !this.partup.uppers) return;
        var uppers = this.partup.uppers;

        return lodash.map(uppers, function(upper, index) {
            var coords = getAvatarCoordinates(uppers.length, index, 0, 24, 100);

            return {
                _id: upper,
                x: coords.x + 95,
                y: coords.y + 95,
                delay: .075 * index
            };
        });
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

    // Outer circle
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    // Arc 1
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4 - settings.linewidth / 2, -(quart), endingAngle, false);
    ctx.strokeStyle = settings.firstcolor;
    ctx.lineWidth = settings.linewidth;
    ctx.stroke();
    ctx.closePath();

    // Arc 2
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 4 - settings.linewidth / 2, endingAngle, -(quart), false);
    ctx.strokeStyle = settings.secondcolor;
    ctx.lineWidth = settings.linewidth;
    ctx.stroke();
    ctx.closePath();
};

/**
 * Function to calculate x and y for an avatar
 *
 * @param {number} count   Number of total avatars
 * @param {number} current   Index of current avatar (from 0)
 * @param {number} base_angle   Base angle (in degrees)
 * @param {number} distance_angle   Distance angle between each avatar (in degrees)
 * @param {number} radius   Radius of the circle in pixels
 * @returns {Object} coordinates   Coordinates for the center of the avatar in pixels
 * @returns {Object} coordinates.x
 * @returns {Object} coordinates.y
 */
var getAvatarCoordinates = function(count, current, base_angle, distance_angle, radius) {
    var start_angle = distance_angle * ((count - 1) / 2) + base_angle;
    var current_angle = start_angle - current * distance_angle;
    var x = radius * Math.cos(current_angle * (Math.PI / 180));
    var y = -radius * Math.sin(current_angle * (Math.PI / 180));

    return {
        x: x,
        y: y
    };
};
