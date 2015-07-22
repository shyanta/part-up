// jscs:disable
/**
 * Render a single partup tile
 *
 * @example
 *
The PartupTile template is mostly used in a ColumnsLayout widget

{{> ColumnsLayout
    COLUMNS=4
    TEMPLATE="PartupTile"
    addHook=addToLayoutHook
    clearHook=clearLayoutHook
}}
 * widget options:
 *
 * @param {Boolean} COMMENTS_LINK   Whether the widget should display the link to comments
 * @module client-partup-tile
 */
// jscs:enable

/*************************************************************/
/* Rendered */
/*************************************************************/
Template.PartupTile.onRendered(function() {
    var canvasElm = this.find('canvas.pu-sub-radial');
    if (canvasElm) drawCircle(canvasElm);
});

/*************************************************************/
/* Helpers */
/*************************************************************/
Template.PartupTile.helpers({
    network: function() {
        if (!this.network_id) return false;
        return Networks.findOne({_id: this.network_id});
    },
    activityCount: function() {
        return this.activity_count || Activities.find({partup_id: this._id}).count();
    },
    dayCount: function() {
        var created = new Date(this.created_at);
        var now = new Date();
        return Math.ceil(((((now - created) / 1000) / 60) / 60) / 24);
    },
    supporterCount: function() {
        if (!this.supporters) return 0;
        return this.supporters.length;
    },
    partupProgress: function() {
        var day = 24 * 60 * 60 * 1000;
        var now = new Date();
        var createdAt = new Date(this.created_at);
        var endsAt = new Date(this.end_date);

        var daysLeft = Math.round(Math.abs((now.getTime() - endsAt.getTime()) / day));
        var daysPast = Math.round(Math.abs((createdAt.getTime() - now.getTime()) / day));

        return (daysPast / (daysLeft + daysPast)) * 100;
    },
    tags: function() {
        if (!this.tags) return;

        var tags = [];
        for (var i = 0; i < this.tags.length; i++) {
            tags.push({
                tag: this.tags[i],
                delay: .075 * i
            });
        }

        return tags;
    },
    upper: function() {
        return Meteor.users.findOne({_id: this._id});
    },
    uppers: function() {
        if (!this._id || !this.uppers) return;
        var uppers = this.uppers;

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
/* Events */
/*************************************************************/
Template.PartupTile.events({
    'click .pu-sub-partup-tags span': function(event, template) {
        Session.set('discover.query', event.target.textContent);
    }
});

/*************************************************************/
/* Functions */
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
