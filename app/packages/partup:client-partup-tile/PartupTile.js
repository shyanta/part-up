// jscs:disable
/**
 * Render a single partup tile
 *
 * widget options:
 *
 * @param {Boolean} HIDE_TAGS       Whether the widget should hide the tags
 * @module client-partup-tile
 */
// jscs:enable

var positionTags = function(tagsEl) {
    var br = document.body.getBoundingClientRect();
    var rect = tagsEl.getBoundingClientRect();

    if (rect.right > br.right) {
        tagsEl.classList.add('pu-state-right');
    }

};

/*************************************************************/
/* Rendered */
/*************************************************************/
Template.PartupTile.onRendered(function() {
    var canvasElm = this.find('canvas.pu-sub-radial');
    if (canvasElm) drawCircle(canvasElm);

    var tagsEl = this.find('.pu-sub-partup-tags');
    if (tagsEl) {
        positionTags(tagsEl);
        window.addEventListener('resize', function() {
            positionTags(tagsEl);
        });
    }

    if (this.data.image) {
        var image = Images.findOne({_id: this.data.image});
        if (image && image.focuspoint) {
            var focuspointElm = this.find('[data-partup-tile-focuspoint]');
            this.focuspoint = new Focuspoint.View(focuspointElm, {
                x: image.focuspoint.x,
                y: image.focuspoint.y
            });
        }
    }
});

/*************************************************************/
/* Helpers */
/*************************************************************/
Template.PartupTile.helpers({
    title: function() {
        return Partup.client.url.capitalizeFirstLetter(this.name);
    },
    network: function() {
        if (!this.network_id) return false;
        var network_from_cache = lodash.find(Partup.client.discover.cache.networks, {_id: this.network_id});
        return network_from_cache || Networks.findOne({_id: this.network_id});
    },
    activityCount: function() {
        return this.activity_count || Activities.findForPartup(this).count();
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
        var upper_from_cache = lodash.find(Partup.client.discover.cache.uppers, {_id: this._id});
        return upper_from_cache || Meteor.users.findOne({_id: this._id});
    },
    uppers: function() {
        if (!this._id || !this.uppers) return;
        var uppers = this.uppers.slice(0);

        if (uppers.length > 5) {
            while (uppers.length > 4) {
                uppers.pop();
            }

            uppers.push(null);
        }

        return lodash.map(uppers, function(upper, index) {
            var coords = getAvatarCoordinates(uppers.length, index, 0, 24, 100);

            var attributes = {
                x: coords.x + 95,
                y: coords.y + 95,
                delay: .075 * index
            };

            if (upper) {
                attributes._id = upper;
            }

            return attributes;
        });
    },
    remainingUppers: function() {
        var uppers = Template.instance().data.uppers;
        return uppers.length > 5 ? uppers.length - 4 : 0;
    },
    userCard: function() {
        if (this._id) return {'data-usercard': this._id};
    },
    partupImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.partups_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;

        return image.url({store: store});
    },
    networkImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.networks_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;

        return image.url({store: store});
    },
    upperImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.uppers_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;

        return image.url({store: store});
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
